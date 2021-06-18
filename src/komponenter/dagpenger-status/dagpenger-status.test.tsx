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

    test('<SoknadTilBehandling> rendres ved innsendt søknad', () => {
        render(<DagpengerStatus />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.dagpenger-status': true },
                sakstema: {
                    sakstema: [
                        {
                            temakode: 'DAG',
                            temanavn: 'Dagpenger',
                            erGruppert: false,
                            behandlingskjeder: [
                                { status: 'UNDER_BEHANDLING', sistOppdatert: '2021-06-03T09:31:57.507+01:00' },
                            ],
                            dokumentMetadata: [
                                {
                                    retning: 'INN',
                                    dato: '2021-05-25T20:46:59.813+02:00',
                                    navn: null,
                                    journalpostId: '493391488',
                                    hoveddokument: {
                                        tittel: 'Søknad om dagpenger (ikke permittert)',
                                        dokumentreferanse: '515191444',
                                        kanVises: true,
                                        logiskDokument: false,
                                    },
                                    vedlegg: [
                                        {
                                            tittel: 'Dokumentasjon av andre ytelser',
                                            dokumentreferanse: '515191445',
                                            kanVises: true,
                                            logiskDokument: false,
                                        },
                                        {
                                            tittel: 'Kvitteringsside for dokumentinnsending',
                                            dokumentreferanse: '515191446',
                                            kanVises: true,
                                            logiskDokument: false,
                                        },
                                    ],
                                    avsender: 'SLUTTBRUKER',
                                    mottaker: 'NAV',
                                    tilhorendeSakid: null,
                                    tilhorendeFagsakId: null,
                                    behandlingsId: '10010WQW9',
                                    baksystem: ['HENVENDELSE'],
                                    temakode: 'DAG',
                                    temakodeVisning: 'Dagpenger',
                                    ettersending: false,
                                    erJournalfort: false,
                                    feilWrapper: { inneholderFeil: false, feilmelding: null },
                                    kategoriNotat: null,
                                    lenkeTilSoknad: null,
                                },
                            ],
                            tilhorendeSaker: [],
                            feilkoder: [],
                        },
                    ],
                    feilendeBaksystemer: ['JOARK', 'JOARK_SIKKERHETSBEGRENSNING'],
                },
            }),
        });

        expect(screen.getByText(/vi har mottatt søknad om dagpenger/i)).toBeInTheDocument();
    });

    test('<FerdigBehandletSoknad> rendres ved søknad ferdig behandlet', () => {
        render(<DagpengerStatus />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.dagpenger-status': true },
                sakstema: {
                    sakstema: [
                        {
                            temakode: 'DAG',
                            temanavn: 'Dagpenger',
                            erGruppert: false,
                            behandlingskjeder: [
                                { status: 'UNDER_BEHANDLING', sistOppdatert: '2021-06-03T09:31:57.507+01:00' },
                                { status: 'FERDIG_BEHANDLET', sistOppdatert: '2021-06-06T09:31:57.507+01:00' },
                            ],
                            dokumentMetadata: [
                                {
                                    retning: 'INN',
                                    dato: '2021-05-25T20:46:59.813+02:00',
                                    navn: null,
                                    journalpostId: '493391488',
                                    hoveddokument: {
                                        tittel: 'Søknad om dagpenger (ikke permittert)',
                                        dokumentreferanse: '515191444',
                                        kanVises: true,
                                        logiskDokument: false,
                                    },
                                    vedlegg: [
                                        {
                                            tittel: 'Dokumentasjon av andre ytelser',
                                            dokumentreferanse: '515191445',
                                            kanVises: true,
                                            logiskDokument: false,
                                        },
                                        {
                                            tittel: 'Kvitteringsside for dokumentinnsending',
                                            dokumentreferanse: '515191446',
                                            kanVises: true,
                                            logiskDokument: false,
                                        },
                                    ],
                                    avsender: 'SLUTTBRUKER',
                                    mottaker: 'NAV',
                                    tilhorendeSakid: null,
                                    tilhorendeFagsakId: null,
                                    behandlingsId: '10010WQW9',
                                    baksystem: ['HENVENDELSE'],
                                    temakode: 'DAG',
                                    temakodeVisning: 'Dagpenger',
                                    ettersending: false,
                                    erJournalfort: false,
                                    feilWrapper: { inneholderFeil: false, feilmelding: null },
                                    kategoriNotat: null,
                                    lenkeTilSoknad: null,
                                },
                            ],
                            tilhorendeSaker: [],
                            feilkoder: [],
                        },
                    ],
                    feilendeBaksystemer: ['JOARK', 'JOARK_SIKKERHETSBEGRENSNING'],
                },
            }),
        });

        expect(screen.getByText(/søknaden din om dagpenger er ferdig behandlet/i)).toBeInTheDocument();
    });
});
