import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import DagpengerStatus from './dagpenger-status';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

const providerProps: ProviderProps = {
    brukerInfo: {
        geografiskTilknytning: '110302',
        alder: 42,
        rettighetsgruppe: 'IYT',
    },
    brukerregistrering: {
        registrering: {
            opprettetDato: '2021-06-01',
        },
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
};

describe('Tester dagpengerkomponenten', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Komponenten rendres IKKE default', () => {
        const { container } = render(<DagpengerStatus />);
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres IKKE når featuretoggle ikke er togglet på', () => {
        const { container } = render(<DagpengerStatus />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres når featuretoggle er togglet på', () => {
        const { container } = render(<DagpengerStatus />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.dagpenger-status': true },
            }),
        });

        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponenten Ikke søkt dagpenger rendres når man har ukjentStatus', () => {
        render(<DagpengerStatus />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.dagpenger-status': true },
            }),
        });

        expect(screen.getByText(/du har ikke søkt om dagpenger/i)).toBeInTheDocument();
    });

    test('<MottarDagpenger> rendres ved innvilget søknad', () => {
        render(<DagpengerStatus />, {
            wrapper: contextProviders({
                ...providerProps,
                brukerInfo: {
                    ...providerProps.brukerInfo,
                    rettighetsgruppe: 'DAGP',
                },
                featureToggle: { 'veientilarbeid.dagpenger-status': true },
            }),
        });

        expect(screen.getByText(/Du har fått innvilget dagpenger/i)).toBeInTheDocument();
    });

    test('<PaabegyntSoknad> rendres ved påbegynt søknad', () => {
        render(<DagpengerStatus />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.dagpenger-status': true },
                paabegynteSoknader: {
                    soknader: [
                        {
                            tittel: 'Søknad om dagpenger (ikke permittert)',
                            lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQX9',
                            dato: '2021-06-02T15:48:19.375+02:00',
                            kilde: 'HENVENDELSE',
                        },
                    ],
                },
            }),
        });

        expect(
            screen.getByText(/du har startet på en søknad om dagpenger, men ikke sendt den inn/i)
        ).toBeInTheDocument();
    });
});
