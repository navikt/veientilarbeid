import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { mockIntersectionObserver } from '../mocks/intersection-observer-mock';
import { setupServer } from 'msw/native';
import Mikrofrontend from '../main';

import * as useSWR from '../hooks/useSWR';
import { ARBEIDSSOKER_NIVA3_URL, AUTH_API, DP_INNSYN_URL } from '../ducks/api';
import msw_get from '../mocks/msw-utils';
import { render } from '../utils/test-utils';
import arbeidssoker from '../mocks/arbeidssoker-niva3-mock';
import { InnloggingsNiva } from '../contexts/autentisering';
import { authenticatedMock } from '../mocks/auth-mock';
import { standardHandlers, ikkeStandardHandlers, initielleKallHandlers } from '../test/test-handlers';

describe('Tester at main rendrer riktig', () => {
    const swrSpy = vi.spyOn(useSWR, 'useSWR');
    const server = setupServer(...initielleKallHandlers);

    beforeEach(() => {
        mockIntersectionObserver();
    });

    beforeAll(() => server.listen());
    afterEach(() => {
        server.resetHandlers();
        vitest.clearAllMocks();
    });
    afterAll(() => server.close());

    test('Rendrer riktig innhold for arbeidssøker med standard innsatsgruppe', async () => {
        server.use(...standardHandlers);
        render(<Mikrofrontend />);

        expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
        expect(swrSpy).toHaveBeenCalledWith(`${DP_INNSYN_URL}/soknad`);
    });

    test('Rendrer riktig innhold for arbeidssøker uten standard innsatsgruppe', async () => {
        server.use(...ikkeStandardHandlers);
        render(<Mikrofrontend />);

        expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
        expect(swrSpy).not.toHaveBeenCalledWith(`${DP_INNSYN_URL}/soknad`);
    });

    test('Rendrer riktig innhold for standard arbeidssøker med nivå 3-innlogging ', async () => {
        server.use(...standardHandlers, msw_get(AUTH_API, authenticatedMock(InnloggingsNiva.LEVEL_3)));
        render(<Mikrofrontend />);

        expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
        expect(swrSpy).not.toHaveBeenCalledWith(`${DP_INNSYN_URL}/soknad`);
    });

    test('Rendrer riktig innhold for standard arbeidssøker som ikke er under oppfølging', async () => {
        server.use(...standardHandlers, msw_get(ARBEIDSSOKER_NIVA3_URL, arbeidssoker(false, 'aktiv')));
        render(<Mikrofrontend />);

        expect(await screen.findByText('Du er registrert som arbeidssøker')).toBeInTheDocument();
        expect(swrSpy).not.toHaveBeenCalledWith(`${DP_INNSYN_URL}/soknad`);
    });

    test('Viser reaktiveringskomponent hvis bruker nylig har vært arbeidssøker', async () => {
        const avsluttetDato = new Date();
        avsluttetDato.setDate(avsluttetDato.getDate() - 2);

        server.use(msw_get(ARBEIDSSOKER_NIVA3_URL, arbeidssoker(false, 'nylig-utløpt')));

        const { container } = render(<Mikrofrontend />);

        await waitForElementToBeRemoved(() => screen.queryByText('venter...'));

        expect(swrSpy).not.toHaveBeenCalledWith('ER_STANDARD_INNSATSGRUPPE_URL');
        expect(container).not.toBeEmptyDOMElement();
        expect(await screen.findByText('Du er ikke lenger registrert som arbeidssøker hos NAV')).toBeInTheDocument();
    });

    test('Viser ingenting når bruker ikke har vært arbeidssøker nylig', async () => {
        server.use(msw_get(ARBEIDSSOKER_NIVA3_URL, arbeidssoker(false, 'gammel')));
        const { container } = render(<Mikrofrontend />);
        await waitForElementToBeRemoved(() => screen.queryByText('venter...'));

        expect(swrSpy).not.toHaveBeenCalledWith('ER_STANDARD_INNSATSGRUPPE_URL');
        expect(container).toBeEmptyDOMElement();
    });
});
