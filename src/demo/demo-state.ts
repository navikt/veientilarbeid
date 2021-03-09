import { InnloggingsNiva } from '../ducks/autentisering';
import { foerstkommendeMandag, plussDager } from '../utils/date-utils';
import { hentQueryParam, settQueryParam } from '../utils/query-param-utils';

type JSONValue = null | string | number | boolean | JSONObject | JSONArray;
interface JSONArray extends Array<JSONValue> {}
type JSONObject = { [member: string]: JSONValue };

export enum DemoData {
    SERVICEGRUPPE = 'servicegruppe',
    FORMIDLINGSGRUPPE = 'formidlingsgruppe',
    SYKMELDT_MED_ARBEIDSGIVER = 'sykmeldtMedArbeidsGiver',
    JSK = 'jsk',
    ULESTE_DIALOGER = 'ulesteDialoger',
    RESERVASJON_KRR = 'reservasjonKRR',
    EGENVURDERING = 'egenvurdering',
    AUTENTISERINGS_INFO = 'autentiseringsInfo',
    MELDEKORT = 'meldekort',
    MOTESTOTTE = 'motestotte',
    GEOGRAFISK_TILKNYTNING = 'geografiskTilknytning',
    REGISTRERING_TYPE = 'registreringType',
    RETTIGHETSGRUPPE = 'rettighetsgruppe',
    FEATURE_TOGGLES = 'featureToggles',
    UNDER_OPPFOLGING = 'underOppfolging',
    KAN_REAKTIVERES = 'kanReaktiveres',
    FREMTIDIG_SITUASJON = 'fremtidigSituasjon',
    FORESLATT_INNSATSGRUPPE = 'foreslattInnsatsgruppe',
    REGISTRERING_OPPRETTET = 'registreringOpprettet',
}

export const hentDemoState = (key: string): string | null => hentQueryParam(key);

export const settDemoState = (key: string, value: string | boolean): void => settQueryParam(key, value.toString());

export const hentServicegruppe = () => hentDemoState(DemoData.SERVICEGRUPPE) || 'IKVAL';
export const settServicegruppe = (value: string) => settDemoState(DemoData.SERVICEGRUPPE, value);

export const hentFormidlingsgruppe = () => hentDemoState(DemoData.FORMIDLINGSGRUPPE) || 'ARBS';
export const settFormidlingsgruppe = (value: string) => settDemoState(DemoData.FORMIDLINGSGRUPPE, value);

export const hentRettighetsgruppe = () => hentDemoState(DemoData.RETTIGHETSGRUPPE) || 'INGEN_VERDI';
export const settRettighetsgruppe = (value: string) => settDemoState(DemoData.RETTIGHETSGRUPPE, value);

export const hentSykmeldtMedArbeidsgiver = () => hentDemoState(DemoData.SYKMELDT_MED_ARBEIDSGIVER) === 'true';
export const settSykmeldtMedArbeidsgiver = (value: boolean) => settDemoState(DemoData.SYKMELDT_MED_ARBEIDSGIVER, value);

export const hentRegistreringType = () => hentDemoState(DemoData.REGISTRERING_TYPE) || 'ORDINAER_REGISTRERING';
export const settRegistreringType = (value: string) => settDemoState(DemoData.REGISTRERING_TYPE, value);

export const hentGeografiskTilknytning = () => hentDemoState(DemoData.GEOGRAFISK_TILKNYTNING) || '3808';
export const settGeografiskTilknytning = (value: string) => settDemoState(DemoData.GEOGRAFISK_TILKNYTNING, value);

export const hentUlesteDialoger = () => hentDemoState(DemoData.ULESTE_DIALOGER) === 'true';
export const settUlesteDialoger = (value: boolean) => settDemoState(DemoData.ULESTE_DIALOGER, value);

export const hentJsk = (): JSONObject | null => (hentDemoState(DemoData.JSK) === 'true' ? { raad: [] } : null);
export const settJsk = (value: boolean) => settDemoState(DemoData.JSK, value);

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

const features = (checked: boolean) => ({
    'veientilarbeid.meldekortonboarding': checked,
});
export const hentFeatureToggles = (): JSONObject => features(hentDemoState(DemoData.FEATURE_TOGGLES) === 'true');
export const settFeatureToggles = (checked: boolean) => settDemoState(DemoData.FEATURE_TOGGLES, checked);

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

export const randomUlesteDialoger = () => {
    const min = 1;
    const max = 99;
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
