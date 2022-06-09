import { InnloggingsNiva } from '../contexts/autentisering';
import { foerstkommendeMandag, plussDager } from '../utils/date-utils';
import { hentQueryParam, settQueryParam } from '../utils/query-param-utils';
import { FeatureToggles } from '../contexts/feature-toggles';
import muligeEttersendelserMock from '../mocks/saksoversikt-mulige-ettersendelser-mock';

type JSONValue = null | string | number | boolean | JSONObject | JSONArray;

interface JSONArray extends Array<JSONValue> {}

type JSONObject = { [member: string]: JSONValue };

export enum DemoData {
    SERVICEGRUPPE = 'servicegruppe',
    FORMIDLINGSGRUPPE = 'formidlingsgruppe',
    SYKMELDT_MED_ARBEIDSGIVER = 'sykmeldtMedArbeidsGiver',
    ULESTE_DIALOGER = 'ulesteDialoger',
    RESERVASJON_KRR = 'reservasjonKRR',
    EGENVURDERING = 'egenvurdering',
    AUTENTISERINGS_INFO = 'autentiseringsInfo',
    MELDEKORT = 'meldekort',
    MOTESTOTTE = 'motestotte',
    GEOGRAFISK_TILKNYTNING = 'geografiskTilknytning',
    REGISTRERING_TYPE = 'registreringType',
    ALDER = 'alder',
    RETTIGHETSGRUPPE = 'rettighetsgruppe',
    FEATURE_TOGGLES = 'featureToggles',
    UNDER_OPPFOLGING = 'underOppfolging',
    KAN_REAKTIVERES = 'kanReaktiveres',
    FREMTIDIG_SITUASJON = 'fremtidigSituasjon',
    DIN_SITUASJON = 'dinSituasjon',
    FORESLATT_INNSATSGRUPPE = 'foreslattInnsatsgruppe',
    REGISTRERING_OPPRETTET = 'registreringOpprettet',
    SKJUL_DEMO = 'skjulDemo',
    DP_STATUS = 'dpStatus',
    KVITTERING_STATUS = 'visKvittering',
    ER_UNDER_30 = 'erUnder30',
    SPRAK = 'lang',
    VIS_ARBEIDSLEDIG_DATO = 'visArbeidsledigDato',
}

export const hentDemoState = (key: string): string | null => hentQueryParam(key);

export const settDemoState = (key: string, value: string | boolean): void => settQueryParam(key, value.toString());

export const hentServicegruppe = () => hentDemoState(DemoData.SERVICEGRUPPE) || 'IKVAL';
export const settServicegruppe = (value: string) => settDemoState(DemoData.SERVICEGRUPPE, value);

export const hentFormidlingsgruppe = () => hentDemoState(DemoData.FORMIDLINGSGRUPPE) || 'ARBS';
export const settFormidlingsgruppe = (value: string) => settDemoState(DemoData.FORMIDLINGSGRUPPE, value);

export const hentRettighetsgruppe = () => hentDemoState(DemoData.RETTIGHETSGRUPPE) || 'INGEN_VERDI';
export const settRettighetsgruppe = (value: string) => settDemoState(DemoData.RETTIGHETSGRUPPE, value);

export const hentAlder = () => parseInt(hentDemoState(DemoData.ALDER) ?? '32');
export const settAlder = (value: string) => settDemoState(DemoData.ALDER, value);

export const hentSykmeldtMedArbeidsgiver = () => hentDemoState(DemoData.SYKMELDT_MED_ARBEIDSGIVER) === 'true';
export const settSykmeldtMedArbeidsgiver = (value: boolean) => settDemoState(DemoData.SYKMELDT_MED_ARBEIDSGIVER, value);

export const hentRegistreringType = () => hentDemoState(DemoData.REGISTRERING_TYPE) || 'ORDINAER_REGISTRERING';
export const settRegistreringType = (value: string) => settDemoState(DemoData.REGISTRERING_TYPE, value);

export const hentGeografiskTilknytning = () => hentDemoState(DemoData.GEOGRAFISK_TILKNYTNING) || '3808';
export const settGeografiskTilknytning = (value: string) => settDemoState(DemoData.GEOGRAFISK_TILKNYTNING, value);

export const hentUlesteDialoger = () => hentDemoState(DemoData.ULESTE_DIALOGER) === 'true';
export const settUlesteDialoger = (value: boolean) => settDemoState(DemoData.ULESTE_DIALOGER, value);

export const hentEgenvurdering = (): JSONObject | null =>
    hentDemoState(DemoData.EGENVURDERING) === 'true' ? { sistOppdatert: '2019-05-12T09:39:01.635+02:00' } : null;
export const settEgenvurdering = (value: boolean) => settDemoState(DemoData.EGENVURDERING, value);

export const hentMotestotte = (): JSONObject | null =>
    hentDemoState(DemoData.MOTESTOTTE) === 'true' ? { dato: '2019-06-06T09:39:01.635+02:00' } : null;
export const settMotestotte = (value: boolean) => settDemoState(DemoData.MOTESTOTTE, value);

export const hentDagerEtterFastsattMeldedag = (): number => {
    const verdi = hentDemoState(DemoData.MELDEKORT);
    return verdi === null ? 0 : parseInt(verdi, 10);
};
export const settAntallDagerEtterFastsattMeldedag = (dag: string) => settDemoState(DemoData.MELDEKORT, dag);

export const hentFeatureToggles = () => {
    const presets = {};
    return Object.values(FeatureToggles).reduce((liste, toggle) => {
        const presetVerdi = presets[toggle];
        liste[toggle] = !hentDemoState(toggle) && presetVerdi ? presetVerdi : hentDemoState(toggle) === 'true';
        return liste;
    }, {});
};

export const settFeatureToggles = (toggle: string, checked: boolean) => settDemoState(toggle, checked);

export const hentReservasjonKRR = (): boolean => hentDemoState(DemoData.RESERVASJON_KRR) === 'true';
export const settReservasjonKRR = (value: boolean) => settDemoState(DemoData.RESERVASJON_KRR, value);

export const hentAutentiseringsInfo = (): JSONObject => ({
    securityLevel: hentDemoState(DemoData.AUTENTISERINGS_INFO) ?? InnloggingsNiva.LEVEL_4,
    loggedIn: true,
});
export const settAutentiseringsInfo = (innloggingsNiva: InnloggingsNiva) =>
    settDemoState(DemoData.AUTENTISERINGS_INFO, innloggingsNiva);

export const hentUnderOppfolging = (): JSONObject => ({
    underOppfolging: hentDemoState(DemoData.UNDER_OPPFOLGING) === 'true',
});
export const settUnderOppfolging = (value: boolean) => settDemoState(DemoData.UNDER_OPPFOLGING, value);

export const hentKanReaktiveres = () => hentDemoState(DemoData.KAN_REAKTIVERES) === 'true';
export const settKanReaktiveres = (value: boolean) => settDemoState(DemoData.KAN_REAKTIVERES, value);

export const hentVisArbeidsledigDato = () => hentDemoState(DemoData.VIS_ARBEIDSLEDIG_DATO) === 'true';
export const settVisArbeidsledigDato = (value: boolean) => settDemoState(DemoData.VIS_ARBEIDSLEDIG_DATO, value);

export const randomUlesteDialoger = () => {
    const min = 1;
    const max = 110;
    return Math.floor(min + Math.random() * (max - min));
};

const fastsattMeldedag = foerstkommendeMandag(new Date());

export function lagMeldekortData() {
    const periodeStart = plussDager(fastsattMeldedag, -14);
    const periodeSlutt = plussDager(fastsattMeldedag, -1);
    const sendedag = plussDager(fastsattMeldedag, -2);
    const iDag = hentDagRelativTilFastsattMeldedag();
    return {
        maalformkode: 'NO',
        meldeform: 'EMELD',
        meldekort: [
            {
                meldekortId: 1526772064,
                kortType: 'ELEKTRONISK',
                meldeperiode: {
                    fra: periodeStart.toISOString(),
                    til: periodeSlutt.toISOString(),
                    kortKanSendesFra: sendedag.toISOString(),
                    kanKortSendes: iDag >= sendedag,
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
}

export function hentDagRelativTilFastsattMeldedag(): Date {
    const dagerEtterFastsattMeldedag = hentDagerEtterFastsattMeldedag();
    return plussDager(fastsattMeldedag, dagerEtterFastsattMeldedag);
}

export const hentDpStatus = () => hentDemoState(DemoData.DP_STATUS) || 'ukjent';
export const settDpStatus = (value: string) => settDemoState(DemoData.DP_STATUS, value);

export const hentDpInnsynPaabegynte = (): JSONValue => {
    const status = hentDpStatus();
    const paabegyntDato = plussDager(new Date(), 2);
    const pabegyntesoknaderMock = [
        {
            tittel: 'Søknad om dagpenger (ikke permittert)',
            behandlingsId: '10010WQX9',
            sistEndret: paabegyntDato.toISOString(),
        },
    ];

    return ['paabegynt', 'soktogpaabegynt'].includes(status) ? pabegyntesoknaderMock : [];
};

export const hentDpMuligeEttersendelser = (): JSONValue => {
    const status = hentDpStatus();
    return status === 'dagpengestatusEttersendVedlegg' ? muligeEttersendelserMock : [];
};

function genererSakstemaMock(valgtStatus: string): JSONValue {
    const plussDagerBehandlet = valgtStatus === 'dagpengestatusSoknadBehandlet' ? 4 : 2;
    const plussDagerInnsendt = valgtStatus === 'dagpengestatusInnsendtSoknad' ? 4 : 2;
    const sistOppdatertBehandlet = plussDager(new Date(), plussDagerBehandlet);
    const sistOppdatertInnsendt = plussDager(new Date(), plussDagerInnsendt);
    const sakstemaMock = {
        sakstema: [
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                erGruppert: false,
                behandlingskjeder: [
                    { status: 'UNDER_BEHANDLING', sistOppdatert: sistOppdatertInnsendt.toISOString() },
                    { status: 'FERDIG_BEHANDLET', sistOppdatert: sistOppdatertBehandlet.toISOString() },
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
                    {
                        retning: 'INN',
                        dato: '2021-01-26T15:34:43.068+01:00',
                        navn: null,
                        journalpostId: '493329276',
                        hoveddokument: {
                            tittel: 'Søknad om dagpenger (ikke permittert)',
                            dokumentreferanse: '515127318',
                            kanVises: true,
                            logiskDokument: false,
                        },
                        vedlegg: [
                            {
                                tittel: 'Kvitteringsside for dokumentinnsending',
                                dokumentreferanse: '515127319',
                                kanVises: true,
                                logiskDokument: false,
                            },
                        ],
                        avsender: 'SLUTTBRUKER',
                        mottaker: 'NAV',
                        tilhorendeSakid: null,
                        tilhorendeFagsakId: null,
                        behandlingsId: '10010WPUZ',
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
    };
    return sakstemaMock;
}

export const hentDpSakstema = (): JSONValue => {
    const status = hentDpStatus();
    return status && ['dagpengestatusSoknadBehandlet', 'dagpengestatusInnsendtSoknad'].includes(status)
        ? genererSakstemaMock(status)
        : { sakstema: [] };
};

export const hentKvitteringStatus = () => hentDemoState(DemoData.KVITTERING_STATUS) || 'kvitteringIkkeValgt';
export const settKvitteringStatus = (value: string) => settDemoState(DemoData.KVITTERING_STATUS, value);

export const hentDpInnsynVedtak = (): JSONValue => {
    const status = hentDpStatus();
    const mottar = hentRettighetsgruppe() === 'DAGP';

    if (status === 'innvilget') {
        return [
            {
                vedtakId: '2',
                fagsakId: 'arenaId',
                status: 'INNVILGET',
                datoFattet: plussDager(new Date(), 3).toISOString(),
                fraDato: plussDager(new Date(), 10).toISOString(),
                tilDato: null,
            },
        ];
    }

    if (status === 'avslag') {
        return [
            {
                vedtakId: '2',
                fagsakId: 'arenaId',
                status: 'AVSLÅTT',
                datoFattet: plussDager(new Date(), 3).toISOString(),
                fraDato: plussDager(new Date(), 10).toISOString(),
                tilDato: null,
            },
        ];
    }

    if (mottar) {
        return [
            {
                vedtakId: '2',
                fagsakId: 'arenaId',
                status: 'INNVILGET',
                datoFattet: plussDager(new Date(), -3).toISOString(),
                fraDato: plussDager(new Date(), 10).toISOString(),
                tilDato: null,
            },
        ];
    }

    return [];
};

export const hentDpInnsynSoknad = (): JSONValue => {
    const status = hentDpStatus();

    if (status === 'soktogpaabegynt') {
        return [
            {
                søknadId: '2',
                skjemaKode: 'NAV 04-01.03',
                tittel: 'Søknad om dagpenger (ikke permittert)',
                journalpostId: '11',
                søknadsType: 'NySøknad',
                kanal: 'Digital',
                datoInnsendt: plussDager(new Date(), 1).toISOString(),
                vedlegg: [
                    {
                        skjemaNummer: '123',
                        navn: 'navn',
                        status: 'LastetOpp',
                    },
                ],
            },
        ];
    }

    if (['innvilget', 'avslag', 'sokt'].includes(status)) {
        return [
            {
                søknadId: '2',
                skjemaKode: 'NAV 04-01.03',
                tittel: 'Søknad om dagpenger (ikke permittert)',
                journalpostId: '11',
                søknadsType: 'NySøknad',
                kanal: 'Digital',
                datoInnsendt: plussDager(new Date(), 2).toISOString(),
                vedlegg: [
                    {
                        skjemaNummer: '123',
                        navn: 'navn',
                        status: 'LastetOpp',
                    },
                ],
            },
        ];
    }

    return [];
};
