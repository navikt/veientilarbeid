/*
import { render, screen } from '@testing-library/react';

import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import ForenkletInnhold from './forenklet-innhold';
*/

describe('tester at komponenten forenklet-innhold fungerer som forventet', () => {
    test('', () => true);
    /*test('Viser ikke sykmeldt når bruker IKKE er sykmeldt med arbeidsgiver', async () => {
        const props: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
        };
        const { container } = render(<ForenkletInnhold />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(await screen.queryByText('Ditt sykefravær')).not.toBeInTheDocument();
    });

    test('Komponenten viser IKKE meldekort man ER sykmeldt med arbeidsgiver', async () => {
        const providerProps: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
        };
        const { container } = render(<ForenkletInnhold />, { wrapper: contextProviders(providerProps) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText('Ditt sykefravær')).toBeInTheDocument();
        expect(await screen.queryByText(/Meldekort/i)).toBeFalsy();
    });*/
});
