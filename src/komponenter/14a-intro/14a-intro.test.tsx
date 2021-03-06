import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Intro14AWrapper from './14a';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';

const providerProps: ProviderProps = {
    brukerInfo: {
        rettighetsgruppe: 'DAGP',
    },
    amplitude: {
        ukerRegistrert: 2,
    },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
};

describe('tester onboarding komponenten for 14a-intro', () => {
    test('komponenten vises IKKE når featuretoggle ikke er satt', () => {
        const { container } = render(<Intro14AWrapper />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten vises når featuretoggle er satt', () => {
        const { container } = render(<Intro14AWrapper />, {
            wrapper: contextProviders({ ...providerProps, featureToggle: { 'veientilarbeid.14a-intro': true } }),
        });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('komponenten starter på sluttkortet når man er forbi uke 0', () => {
        render(<Intro14AWrapper />, {
            wrapper: contextProviders({ ...providerProps, featureToggle: { 'veientilarbeid.14a-intro': true } }),
        });
        expect(screen.getByText(/Trenger du hjelp eller støtte/i)).toBeInTheDocument();
    });

    test('komponenten starter på kort 1 når man er på uke 0', () => {
        render(<Intro14AWrapper />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.14a-intro': true },
                amplitude: {
                    ukerRegistrert: 0,
                },
            }),
        });
        expect(screen.getByText(/Hva slags type hjelp kan jeg få/i)).toBeInTheDocument();
        expect(screen.getByText(/1 av 3/i)).toBeInTheDocument();
    });

    test('man kan navigere seg gjennom kortene', () => {
        render(<Intro14AWrapper />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.14a-intro': true },
                amplitude: {
                    ukerRegistrert: 0,
                },
            }),
        });
        const forrigeKnapp = screen.getByRole('button', { name: /forrige/i });
        const nesteKnapp = screen.getByRole('button', { name: /neste/i });
        // Sjekker at vi er på første kortet
        expect(screen.getByText(/Hva slags type hjelp kan jeg få/i)).toBeInTheDocument();
        expect(screen.getByText(/1 av 3/i)).toBeInTheDocument();
        // sjekker at vi ikke kan gå bakover fra første kort
        userEvent.click(forrigeKnapp);
        expect(screen.getByText(/1 av 3/i)).toBeInTheDocument();
        // Går til neste kort
        userEvent.click(nesteKnapp);
        expect(screen.getByText(/2 av 3/i)).toBeInTheDocument();
        userEvent.click(nesteKnapp);
        expect(screen.getByText(/3 av 3/i)).toBeInTheDocument();
        // Går et steg tilbakeog frem igjen
        userEvent.click(forrigeKnapp);
        expect(screen.getByText(/2 av 3/i)).toBeInTheDocument();
        userEvent.click(nesteKnapp);
        // Sjekker  avslutningsknapp
        const avsluttKnapp = screen.getByRole('button', { name: /avslutt introduksjonen/i });
        userEvent.click(avsluttKnapp);
        expect(screen.getByText(/Trenger du hjelp eller støtte/i)).toBeInTheDocument();
        // sjekker les igjen knapp
        const lesIgjenKnapp = screen.getByRole('button', { name: /les om hva slags hjelp du kan få/i });
        userEvent.click(lesIgjenKnapp);
        expect(screen.getByText(/Hva slags type hjelp kan jeg få/i)).toBeInTheDocument();
        expect(screen.getByText(/1 av 3/i)).toBeInTheDocument();
    });
});
