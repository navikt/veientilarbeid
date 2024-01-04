import { render, screen } from '@testing-library/react';

import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Situasjonsbestemt from './situasjonsbestemt';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';
import { setupServer } from 'msw/node';
import msw_get from '../../mocks/msw-utils';
import { ARBEIDSOKER_INNHOLD } from '../../ducks/api';
import { SWRConfig } from 'swr';
import arbeidssokerInnholdMock from '../../mocks/arbeidssoker-innhold-mock';

describe('tester at komponenten situasjonsbestemt fungerer som forventet', () => {
    const arbeidssokerData = { ...arbeidssokerInnholdMock, brukerInfo: { data: { erSykmeldtMedArbeidsgiver: false } } };
    const server = setupServer(msw_get(ARBEIDSOKER_INNHOLD, arbeidssokerData));
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
    });
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Viser ikke sykmeldt når bruker IKKE er sykmeldt med arbeidsgiver', async () => {
        const props: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        const { container } = render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Situasjonsbestemt />
            </SWRConfig>,
            { wrapper: contextProviders(props) },
        );
        expect(container).not.toBeEmptyDOMElement();
        let nonExist = false;
        try {
            await screen.findByText('Ditt sykefravær');
        } catch (error) {
            nonExist = true;
        }
        expect(nonExist).toEqual(true);
    });

    test('Viser sykmeldt når bruker ER sykmeldt med arbeidsgiver', async () => {
        server.use(
            msw_get(ARBEIDSOKER_INNHOLD, {
                ...arbeidssokerData,
                brukerInfo: { data: { ...arbeidssokerData.brukerInfo.data, erSykmeldtMedArbeidsgiver: true } },
            }),
        );
        const providerProps: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        const { container } = render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Situasjonsbestemt />
            </SWRConfig>,
            { wrapper: contextProviders(providerProps) },
        );
        expect(container).not.toBeEmptyDOMElement();
        expect(await screen.findByText('Ditt sykefravær')).toBeInTheDocument();
    });
});
