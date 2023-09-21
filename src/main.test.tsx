import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { mockIntersectionObserver } from './mocks/intersection-observer-mock';
import { setupServer } from 'msw/native';
import Mikrofrontend from './main';

import * as useSWR from './hooks/useSWR';
import { ARBEIDSSOKER_NIVA3_URL, AUTH_API, DP_INNSYN_URL, KAN_REAKTIVERES_URL } from './ducks/api';
import msw_get from './mocks/msw-utils';
import { render } from './utils/test-utils';
import arbeidssoker from './mocks/arbeidssoker-niva3-mock';
import { InnloggingsNiva } from './contexts/autentisering';
import { authenticatedMock } from './mocks/auth-mock';
import { ikkeStandardHandlers, initielleKallHandlers, standardHandlers } from './test/test-handlers';

describe('Tester at main rendrer riktig innhold', () => {
    const swrSpy = vi.spyOn(useSWR, 'useSWRImmutable');
    const server = setupServer(...initielleKallHandlers);
    // Stripp query params for å slippe syting og klaging i loggen
    const ARBEIDSSOKER_NIVA3_URL_UTEN_QUERY_PARAMS = ARBEIDSSOKER_NIVA3_URL.split('?')[0];

    beforeEach(() => {
        mockIntersectionObserver();
    });

    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
        vitest.clearAllMocks();
    });

    describe('for arbeidssøker', () => {
        test('med standard innsatsgruppe', async () => {
            server.use(...standardHandlers);
            render(<Mikrofrontend />);

            expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
        });

        test('med standard innsatsgruppe og nivå 3-innlogging', async () => {
            server.use(...standardHandlers, msw_get(AUTH_API, authenticatedMock(InnloggingsNiva.LEVEL_3)));
            render(<Mikrofrontend />);

            expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
            expect(swrSpy).not.toHaveBeenCalledWith(`${DP_INNSYN_URL}/soknad`);
        });

        test('med standard innsatsgruppe som ikke er under oppfølging', async () => {
            server.use(
                ...standardHandlers,
                msw_get(ARBEIDSSOKER_NIVA3_URL_UTEN_QUERY_PARAMS, arbeidssoker(false, 'aktiv')),
            );
            render(<Mikrofrontend />);

            expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
            expect(swrSpy).not.toHaveBeenCalledWith(`${DP_INNSYN_URL}/soknad`);
        });

        test('uten standard innsatsgruppe', async () => {
            server.use(...ikkeStandardHandlers);
            render(<Mikrofrontend />);

            expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
            expect(swrSpy).not.toHaveBeenCalledWith(`${DP_INNSYN_URL}/soknad`);
        });
    });

    describe('for bruker som ikke er arbeidssøker', () => {
        test(', men er under oppfølging', async () => {
            server.use(
                ...ikkeStandardHandlers,
                msw_get(ARBEIDSSOKER_NIVA3_URL_UTEN_QUERY_PARAMS, arbeidssoker(true, 'ingen')),
            );
            render(<Mikrofrontend />);

            expect(await screen.findByText('Dialog')).toBeInTheDocument();
            expect(await screen.queryByText('Du er registrert som arbeidssøker')).not.toBeInTheDocument();
            expect(swrSpy).not.toHaveBeenCalledWith(`${DP_INNSYN_URL}/soknad`);
        });

        test(', men nylig har vært arbeidssøker (viser reaktiveringskomponent)', async () => {
            server.use(msw_get(ARBEIDSSOKER_NIVA3_URL_UTEN_QUERY_PARAMS, arbeidssoker(false, 'nylig-utlopt')));
            server.use(msw_get(KAN_REAKTIVERES_URL, { kanReaktiveres: true }));

            const { container } = render(<Mikrofrontend />);

            await waitForElementToBeRemoved(() => screen.queryByText('venter...'));

            expect(swrSpy).not.toHaveBeenCalledWith('ER_STANDARD_INNSATSGRUPPE_URL');
            expect(container).not.toBeEmptyDOMElement();
            expect(
                await screen.findByText('Du er ikke lenger registrert som arbeidssøker hos NAV'),
            ).toBeInTheDocument();
        });

        test(', ikke har vært arbeidssøker nylig og ikke er under oppfølging (viser ingenting)', async () => {
            server.use(msw_get(ARBEIDSSOKER_NIVA3_URL_UTEN_QUERY_PARAMS, arbeidssoker(false, 'gammel')));
            const { container } = render(<Mikrofrontend />);
            await waitForElementToBeRemoved(() => screen.queryByText('venter...'));

            expect(swrSpy).not.toHaveBeenCalledWith('ER_STANDARD_INNSATSGRUPPE_URL');
            expect(container).toBeEmptyDOMElement();
        });
    });
});
