import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import OnboardingMeldekort from './meldekort-intro';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';

const meldekort = {
    maalformkode: 'NO',
    meldeform: 'EMELD',
    meldekort: [
        {
            meldekortId: 1526772064,
            kortType: 'ELEKTRONISK',
            meldeperiode: {
                fra: '2021-01-18T12:00:00+01:00',
                til: '2021-01-31T12:00:00+01:00',
                kortKanSendesFra: '2021-01-30T12:00:00+01:00',
                kanKortSendes: true,
                periodeKode: '202103',
            },
            meldegruppe: 'ARBS',
            kortStatus: 'OPPRE',
            bruttoBelop: 0.0,
            erForskuddsPeriode: false,
            korrigerbart: true,
        },
    ],
    etterregistrerteMeldekort: [],
    id: '1',
    antallGjenstaaendeFeriedager: 0,
};

const providerProps: ProviderProps = {
    meldekort: meldekort,
    brukerInfo: {
        rettighetsgruppe: 'DAGP',
    },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
    featureToggle: {
        'veientilarbeid.meldekortonboarding': true,
    },
};

describe('tester onboarding komponenten for meldekort', () => {
    test('funksjonen for neste og forrige kort fungerer for nyregistrerte', () => {
        const props: ProviderProps = { ...providerProps, amplitude: { ukerRegistrert: 0 } };
        render(<OnboardingMeldekort />, { wrapper: contextProviders(props) });
        const nesteknapp = screen.getByText(/neste/i);
        const forrigeknapp = screen.getByText(/forrige/i);

        expect(screen.getByText(/1 av 3/i)).toBeInTheDocument();
        expect(nesteknapp).toBeEnabled();
        expect(forrigeknapp).toBeDisabled();

        // Navigerer seg gjennom kortene - fremover
        userEvent.click(nesteknapp);
        expect(screen.getByText(/2 av 3/i)).toBeInTheDocument();
        userEvent.click(nesteknapp);
        expect(screen.getByText(/3 av 3/i)).toBeInTheDocument();
        expect(screen.getByText(/avslutt introduksjon/i)).toBeEnabled();

        // Kan gå tilbake til side 1
        userEvent.click(forrigeknapp);
        expect(screen.getByText(/2 av 3/i)).toBeInTheDocument();
        userEvent.click(forrigeknapp);
        expect(screen.getByText(/1 av 3/i)).toBeInTheDocument();
        expect(forrigeknapp).toBeDisabled();

        // Gå helt til siste side
        userEvent.click(nesteknapp);
        userEvent.click(nesteknapp);
        userEvent.click(screen.getByText(/avslutt introduksjon/i));
        expect(screen.getByText(/Innsending av meldekort/i)).toBeInTheDocument();
        expect(nesteknapp).not.toBeInTheDocument();
        expect(forrigeknapp).not.toBeInTheDocument();
    });

    test('man starter på endstate uten navigeringsvalg om man har vært registrert i minst én uke', () => {
        const props: ProviderProps = { ...providerProps, amplitude: { ukerRegistrert: 1 } };
        const { container } = render(<OnboardingMeldekort />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.queryByText(/neste/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/forrige/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/av 4/i)).not.toBeInTheDocument();
    });
});
