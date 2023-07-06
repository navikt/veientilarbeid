import { InnloggingsNiva, Data as AutentiseringsData } from '../contexts/autentisering';
import { datoUtenTid, foerstkommendeMandag, plussDager } from '../utils/date-utils';
import { hentQueryParam, settQueryParam } from '../utils/query-param-utils';
import { FeatureToggles } from '../contexts/feature-toggles';

type JSONValue = null | string | number | boolean | JSONObject | JSONArray;

interface JSONArray extends Array<JSONValue> {}

type JSONObject = { [member: string]: JSONValue };

interface OpprettetRegistreringDato {
    registrertForLanseringEgenvurdering: string;
    registrertMellomLanseringEgenvurderingOgMotestotte: string;
    registrertEtterLanseringMotestotte: string;
    registrertIDag: string;
    uke1: string;
    uke2: string;
    uke11: string;
    uke12: string;
}

export const opprettetRegistreringDato: OpprettetRegistreringDato = {
    registrertForLanseringEgenvurdering: '2019-05-09T12:00:00.111111+01:00',
    registrertMellomLanseringEgenvurderingOgMotestotte: '2019-05-11T12:00:00.111111+01:00',
    registrertEtterLanseringMotestotte: '2019-06-05T12:00:00.111111+01:00',
    registrertIDag: datoUtenTid(new Date().toISOString()).toISOString(),
    uke1: datoUtenTid(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()).toISOString(),
    uke2: datoUtenTid(new Date(new Date().setDate(new Date().getDate() - 7 * 2)).toISOString()).toISOString(),
    uke11: datoUtenTid(new Date(new Date().setDate(new Date().getDate() - 7 * 11)).toISOString()).toISOString(),
    uke12: datoUtenTid(new Date(new Date().setDate(new Date().getDate() - 7 * 12)).toISOString()).toISOString(),
};

export enum DemoData {
    SERVICEGRUPPE = 'servicegruppe',
    FORMIDLINGSGRUPPE = 'formidlingsgruppe',
    SYKMELDT_MED_ARBEIDSGIVER = 'sykmeldtMedArbeidsGiver',
    ULESTE_DIALOGER = 'ulesteDialoger',
    RESERVASJON_KRR = 'reservasjonKRR',
    AUTENTISERINGS_INFO = 'autentiseringsInfo',
    MELDEKORT = 'meldekort',
    MOTESTOTTE = 'motestotte',
    REGISTRERING_TYPE = 'registreringType',
    ALDER = 'alder',
    RETTIGHETSGRUPPE = 'rettighetsgruppe',
    ARBEIDSSOKER_PERIODE = 'arbeidssokerPeriode',
    FEATURE_TOGGLES = 'featureToggles',
    UNDER_OPPFOLGING = 'underOppfolging',
    STANDARD_INNSATSGRUPPE = 'standardInnsatsgruppe',
    FREMTIDIG_SITUASJON = 'fremtidigSituasjon',
    DIN_SITUASJON = 'dinSituasjon',
    FORESLATT_INNSATSGRUPPE = 'foreslattInnsatsgruppe',
    REGISTRERING_OPPRETTET = 'registreringOpprettet',
    SKJUL_DEMO = 'skjulDemo',
    DP_STATUS = 'dpStatus',
    KVITTERING_STATUS = 'visKvittering',
    ER_UNDER_30 = 'erUnder30',
    SPRAK = 'lang',
    VIS_GJELDER_FRA_DATO = 'visGjelderFraDato',
    GJELDER_FRA_DATO = 'gjelderFraDato',
    PROFIL = 'profil',
    BEHOV_FOR_VEILEDNING = 'behovForVeiledning',
    ARBEIDSSOKER_NESTE_PERIODE = 'arbeidssokerNestePeriode',
    REAKTIVERING = 'reaktivering',
    NY_SITUASJON = 'nySituasjon',
    NY_SITUASJON_FRA = 'nySituasjonFra',
    ENDRET_SITUASJON = 'endretSituasjon',
    ENDRET_SITUASJON_AV = 'endretSituasjonAv',
    SITUASJON_TILLEGGSDATA = 'situasjonTilleggsData',
    ER_BESVARELSEN_ENDRET = 'erBesvarelsenEndret',
}

export const hentDemoState = (key: string): string | null => hentQueryParam(key);

export const settDemoState = (key: string, value: string | boolean): void => settQueryParam(key, value.toString());

export const hentServicegruppe = () => hentDemoState(DemoData.SERVICEGRUPPE) || 'IKVAL';
export const settServicegruppe = (value: string) => settDemoState(DemoData.SERVICEGRUPPE, value);

export const hentFormidlingsgruppe = () => hentDemoState(DemoData.FORMIDLINGSGRUPPE) || 'ARBS';
export const settFormidlingsgruppe = (value: string) => settDemoState(DemoData.FORMIDLINGSGRUPPE, value);

export const hentRettighetsgruppe = () => hentDemoState(DemoData.RETTIGHETSGRUPPE) || 'INGEN_VERDI';
export const settRettighetsgruppe = (value: string) => settDemoState(DemoData.RETTIGHETSGRUPPE, value);

export const hentArbeidssokerPeriode = () => hentDemoState(DemoData.ARBEIDSSOKER_PERIODE) || 'aktiv';
export const settArbeidssokerPeriode = (value: string) => settDemoState(DemoData.ARBEIDSSOKER_PERIODE, value);

export const hentAlder = () => parseInt(hentDemoState(DemoData.ALDER) ?? '32');
export const settAlder = (value: string) => settDemoState(DemoData.ALDER, value);

export const hentSykmeldtMedArbeidsgiver = () => hentDemoState(DemoData.SYKMELDT_MED_ARBEIDSGIVER) === 'true';
export const settSykmeldtMedArbeidsgiver = (value: boolean) => settDemoState(DemoData.SYKMELDT_MED_ARBEIDSGIVER, value);

export const hentRegistreringType = () => hentDemoState(DemoData.REGISTRERING_TYPE) || 'ORDINAER_REGISTRERING';
export const settRegistreringType = (value: string) => settDemoState(DemoData.REGISTRERING_TYPE, value);

export const hentUlesteDialoger = () => hentDemoState(DemoData.ULESTE_DIALOGER) === 'true';
export const settUlesteDialoger = (value: boolean) => settDemoState(DemoData.ULESTE_DIALOGER, value);

export const hentMotestotte = (): JSONObject | null =>
    hentDemoState(DemoData.MOTESTOTTE) === 'true' ? { dato: '2019-06-06T09:39:01.635+02:00' } : null;
export const settMotestotte = (value: boolean) => settDemoState(DemoData.MOTESTOTTE, value);

export const hentDagerEtterFastsattMeldedag = (): number => {
    const verdi = hentDemoState(DemoData.MELDEKORT);
    return verdi === null ? 0 : parseInt(verdi, 10);
};
export const settAntallDagerEtterFastsattMeldedag = (dag: string) => settDemoState(DemoData.MELDEKORT, dag);

export const hentFeatureToggles = () => {
    const presets: any = {};
    return Object.values(FeatureToggles).reduce((liste: any, toggle) => {
        const presetVerdi = presets[toggle];
        liste[toggle] = !hentDemoState(toggle) && presetVerdi ? presetVerdi : hentDemoState(toggle) === 'true';
        return liste;
    }, {});
};

export const settFeatureToggles = (toggle: string, checked: boolean) => settDemoState(toggle, checked);

export const hentAutentiseringsInfo = (): AutentiseringsData => ({
    securityLevel: (hentDemoState(DemoData.AUTENTISERINGS_INFO) ?? InnloggingsNiva.LEVEL_4) as InnloggingsNiva,
    authenticated: true,
});

export const settAutentiseringsInfo = (innloggingsNiva: InnloggingsNiva) =>
    settDemoState(DemoData.AUTENTISERINGS_INFO, innloggingsNiva);

export const hentUnderOppfolging = () => {
    const queryParam = hentDemoState(DemoData.UNDER_OPPFOLGING);
    return {
        underOppfolging: queryParam ? queryParam === 'true' : true,
    };
};
export const settUnderOppfolging = (value: boolean) => settDemoState(DemoData.UNDER_OPPFOLGING, value);

export const hentStandardInnsatsgruppe = () => {
    const queryParam = hentDemoState(DemoData.STANDARD_INNSATSGRUPPE);
    return {
        standardInnsatsgruppe: queryParam ? queryParam === 'true' : true,
    };
};
export const settStandardInnsatsgruppe = (value: boolean) => settDemoState(DemoData.STANDARD_INNSATSGRUPPE, value);

export const hentVisGjelderFraDato = () => hentDemoState(DemoData.VIS_GJELDER_FRA_DATO) === 'true';
export const settVisGjelderFraDato = (value: boolean) => settDemoState(DemoData.VIS_GJELDER_FRA_DATO, value);

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
