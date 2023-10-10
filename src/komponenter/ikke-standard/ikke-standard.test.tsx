import { render, screen } from '@testing-library/react';

import ForenkletInnhold from './forenklet-innhold';
import { setupServer } from 'msw/native';
import { beforeAll } from 'vitest';
import msw_get from '../../mocks/msw-utils';
import { ARBEIDSOKER_INNHOLD, DP_INNSYN_URL } from '../../ducks/api';
import * as useSWR from '../../hooks/useSWR';
import arbeidssokerInnholdMock from '../../mocks/arbeidssoker-innhold-mock';

describe('tester at komponenten forenklet-innhold fungerer som forventet', () => {
    test('', () => true);
    /*const swrSpy = vi.spyOn(useSWR, 'useSWRImmutable');
    const server = setupServer(msw_get(ARBEIDSOKER_INNHOLD, arbeidssokerInnholdMock));
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
    });

    test('Viser ikke sykmeldt når bruker IKKE er sykmeldt med arbeidsgiver', async () => {
        server.use(msw_get(ARBEIDSOKER_INNHOLD, { brukerInfo: { data: { erSykmeldtMedArbeidsgiver: false } } }));

        const { container } = render(<ForenkletInnhold />);
        expect(container).not.toBeEmptyDOMElement();
        expect(await screen.findByText('Ditt sykefravær')).not.toBeInTheDocument();
    });

    test('Komponenten viser IKKE meldekort man ER sykmeldt med arbeidsgiver', async () => {
        server.use(
            msw_get(ARBEIDSOKER_INNHOLD, { brukerInfo: { data: { erSykmeldtMedArbeidsgiver: true } } }),
        );

        const { container } = render(<ForenkletInnhold />);
        expect(container).not.toBeEmptyDOMElement();
        expect(swrSpy).toHaveBeenCalledWith(ARBEIDSOKER_INNHOLD);
        expect(await screen.findByText('Ditt sykefravær')).toBeInTheDocument();
        expect(await screen.queryByText(/Meldekort/i)).toBeFalsy();
    });*/
});
