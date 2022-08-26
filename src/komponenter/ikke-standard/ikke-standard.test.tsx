import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import IkkeStandard from './ikke-standard';

describe('tester at komponenten ikke-standard fungerer som forventet', () => {
    test('Komponenten viser  meldekort når arbeidssøker IKKE er sykmeldt med arbeidsgiver', () => {
        const props: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            underOppfolging: { underOppfolging: true },
        };
        const { container } = render(<IkkeStandard />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText('Meldekort')).toBeInTheDocument();
    });

    test('Komponenten viser IKKE meldekort man ER sykmeldt med arbeidsgiver', async () => {
        const providerProps: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
            underOppfolging: { underOppfolging: true },
        };
        const { container } = render(<IkkeStandard />, { wrapper: contextProviders(providerProps) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText('Ditt sykefravær')).toBeInTheDocument();
        expect(await screen.queryByText(/Meldekort/i)).toBeFalsy();
    });
});
