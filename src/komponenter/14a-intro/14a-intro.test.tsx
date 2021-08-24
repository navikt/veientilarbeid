import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Intro14AWrapper from './14a';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

const providerProps: ProviderProps = {
    brukerInfo: {
        rettighetsgruppe: 'DAGP',
        geografiskTilknytning: '110302',
        alder: 42,
    },
    amplitude: {
        ukerRegistrert: 2,
        gruppe: 'kss',
        eksperimenter: ['onboarding14a'],
    },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
    brukerregistrering: {
        registrering: {
            opprettetDato: '2020-06-01',
        },
    },
};

describe('tester onboarding komponenten for 14a-intro', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('komponenten vises IKKE når featuretoggle ikke er satt', () => {
        const { container } = render(<Intro14AWrapper />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten vises IKKE når bruker er 29 år', () => {
        const { container } = render(<Intro14AWrapper />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.14a-intro': true },
                brukerInfo: { alder: 29 },
            }),
        });
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten vises IKKE når bruker har vært registrert i 13 uker', () => {
        const { container } = render(<Intro14AWrapper />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.14a-intro': true },
                amplitude: { ukerRegistrert: 13 },
            }),
        });
        screen.debug();
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten vises IKKE når eksperimentet onboarding14a ikke er med', () => {
        const { container } = render(<Intro14AWrapper />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.14a-intro': true },
                amplitude: { ...providerProps.amplitude, eksperimenter: [] },
            }),
        });
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten vises når featuretoggle er satt og men hører til kontor som deltar på eksperimentet', () => {
        const { container } = render(<Intro14AWrapper />, {
            wrapper: contextProviders({ ...providerProps, featureToggle: { 'veientilarbeid.14a-intro': true } }),
        });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('komponenten starter på sluttkortet når man er forbi uke 0', () => {
        render(<Intro14AWrapper />, {
            wrapper: contextProviders({ ...providerProps, featureToggle: { 'veientilarbeid.14a-intro': true } }),
        });
        expect(screen.getByText(/Om du ønsker oppfølging/i)).toBeInTheDocument();
    });

    test('komponenten starter i pre-state når man er på uke 0', () => {
        render(<Intro14AWrapper />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.14a-intro': true },
                amplitude: {
                    ...providerProps.amplitude,
                    ukerRegistrert: 0,
                },
            }),
        });
        expect(screen.getByText(/start introduksjonen/i)).toBeInTheDocument();
    });

    test('man kan navigere seg gjennom kortene', () => {
        render(<Intro14AWrapper />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.14a-intro': true },
                amplitude: {
                    ...providerProps.amplitude,
                    ukerRegistrert: 0,
                },
            }),
        });
        const startKnapp = screen.getByRole('button', { name: /start introduksjonen/i });
        expect(screen.getByText(/3 minutter lesetid/i)).toBeInTheDocument();
        userEvent.click(startKnapp);
        const forrigeKnapp = screen.getByRole('button', { name: /forrige/i });
        const nesteKnapp = screen.getByRole('button', { name: /neste/i });
        // Sjekker at vi er på første kortet
        expect(screen.getByText(/Hva slags hjelp kan jeg få/i)).toBeInTheDocument();
        expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
        // sjekker at vi ikke kan gå bakover fra første kort
        userEvent.click(forrigeKnapp);
        expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
        // Går til neste kort
        userEvent.click(nesteKnapp);
        expect(screen.getByText(/2 av 4/i)).toBeInTheDocument();
        userEvent.click(nesteKnapp);
        expect(screen.getByText(/3 av 4/i)).toBeInTheDocument();
        // Går et steg tilbakeog frem igjen
        userEvent.click(forrigeKnapp);
        expect(screen.getByText(/2 av 4/i)).toBeInTheDocument();
        userEvent.click(nesteKnapp);
        expect(screen.getByText(/3 av 4/i)).toBeInTheDocument();
        userEvent.click(nesteKnapp);
        // Sjekker  avslutningsknapp
        const avsluttKnapp = screen.getByRole('button', { name: /fullfør/i });
        userEvent.click(avsluttKnapp);
        expect(screen.getByText(/Om du ønsker oppfølging/i)).toBeInTheDocument();
        // sjekker les igjen knapp
        const lesIgjenKnapp = screen.getByText(/les om hva slags hjelp du kan få/i);
        userEvent.click(lesIgjenKnapp);
        expect(screen.getByText(/Hva slags hjelp kan jeg få/i)).toBeInTheDocument();
        expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
    });
});
