import { InnloggingsNiva } from '../ducks/autentisering';
import { foerstkommendeMandag, plussDager } from '../utils/date-utils';
import { hentFraLocalStorage, settILocalStorage, slettFraLocalStorage } from '../utils/localStorage-utils';
import { hentQueryParam, settQueryParam, slettQueryParam } from '../utils/query-param-utils';

type JSONValue = null | string | number | boolean | JSONObject | JSONArray;
interface JSONArray extends Array<JSONValue> {}
type JSONObject = { [member: string]: JSONValue };

export enum DemoData {
    SERVICEGRUPPE = 'servicegruppe',
    FORMIDLINGSGRUPPE = 'formidlingsgruppe',
    SYKMELDT_MED_ARBEIDSGIVER = 'sykmeldtMedArbeidsGiver',
    BRUKER_REGISTRERING = 'brukerRegistrering',
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
}

const brukURL = false;

export const hentDemoState = (key: string): string | null => (brukURL ? hentQueryParam(key) : hentFraLocalStorage(key));

export const settDemoState = (key: string, value: string): void =>
    brukURL ? settQueryParam(key, value) : settILocalStorage(key, value);

export const slettDemoState = (key: string): void => (brukURL ? slettQueryParam(key) : slettFraLocalStorage(key));

export const hentServicegruppe = (): string => {
    slettDemoState('innsatsgruppe'); // Rydder opp etter oppdatering av key fra innsatsgruppe til servicegruppe
    return hentDemoState(DemoData.SERVICEGRUPPE) || 'IKVAL';
};

export const settServicegruppe = (value: string) => {
    slettDemoState('innsatsgruppe'); // Rydder opp etter oppdatering av key fra innsatsgruppe til servicegruppe
    settDemoState(DemoData.SERVICEGRUPPE, value);
};

export const hentFormidlingsgruppe = (): string => {
    return hentDemoState(DemoData.FORMIDLINGSGRUPPE) || 'ARBS';
};

export const settFormidlingsgruppe = (value: string) => {
    settDemoState(DemoData.FORMIDLINGSGRUPPE, value);
};

export const hentRettighetsgruppe = (): string => {
    return hentDemoState(DemoData.RETTIGHETSGRUPPE) || 'INGEN_VERDI';
};

export const settRettighetsgruppe = (value: string) => {
    settDemoState(DemoData.RETTIGHETSGRUPPE, value);
};

export const hentSykmeldtMedArbeidsgiver = (): boolean => {
    return hentDemoState(DemoData.SYKMELDT_MED_ARBEIDSGIVER) === 'true';
};

export const settSykmeldtMedArbeidsgiver = (value: string) => {
    settDemoState(DemoData.SYKMELDT_MED_ARBEIDSGIVER, value);
};

export const hentRegistreringType = (): string => {
    return hentDemoState(DemoData.REGISTRERING_TYPE) || 'ORDINAER_REGISTRERING';
};

export const settRegistreringType = (value: string) => {
    settDemoState(DemoData.REGISTRERING_TYPE, value);
};

export const hentGeografiskTilknytning = (): string => {
    return hentDemoState(DemoData.GEOGRAFISK_TILKNYTNING) || '0807';
};

export const settGeografiskTilknytning = (value: string) => {
    settDemoState(DemoData.GEOGRAFISK_TILKNYTNING, value);
};

export const hentUlesteDialoger = (): boolean => {
    return hentDemoState(DemoData.ULESTE_DIALOGER) === 'true';
};

export const settUlesteDialoger = (value: string) => {
    settDemoState(DemoData.ULESTE_DIALOGER, value);
};

export const hentJsk = (): JSONObject | null => {
    const verdi = hentDemoState(DemoData.JSK);
    return verdi ? JSON.parse(verdi) : null;
};

export const settJsk = () => {
    settDemoState(DemoData.JSK, JSON.stringify({ raad: [] }));
};

export const slettJsk = () => {
    slettDemoState(DemoData.JSK);
};

export const hentEgenvurdering = (): JSONObject | null => {
    const verdi = hentDemoState(DemoData.EGENVURDERING);
    return verdi ? JSON.parse(verdi) : null;
};

export const settEgenvurdering = () => {
    settDemoState(DemoData.EGENVURDERING, JSON.stringify({ sistOppdatert: '2019-05-12T09:39:01.635+02:00' }));
};

export const slettEgenvurdering = () => {
    slettDemoState(DemoData.EGENVURDERING);
};

export const hentMotestotte = (): JSONObject | null => {
    const verdi = hentDemoState(DemoData.MOTESTOTTE);
    return verdi ? JSON.parse(verdi) : null;
};

export const settMotestotte = () => {
    settDemoState(DemoData.MOTESTOTTE, JSON.stringify({ dato: '2019-06-06T09:39:01.635+02:00' }));
};

export const slettMotestotte = () => {
    slettDemoState(DemoData.MOTESTOTTE);
};

export const hentDagerEtterFastsattMeldedag = (): number => {
    const verdi = hentDemoState(DemoData.MELDEKORT);
    return verdi ? parseInt(verdi) : 0;
};

export const settAntallDagerEtterFastsattMeldedag = (dag: string) => {
    settDemoState(DemoData.MELDEKORT, dag);
};

const features = (checked: boolean) => ({
    'veientilarbeid.meldekortonboarding': checked,
});

export const hentFeatureToggles = (): JSONObject => {
    const verdi = hentDemoState(DemoData.FEATURE_TOGGLES);
    return verdi ? JSON.parse(verdi) : features(true);
};

export const settFeatureToggles = (checked: boolean) => {
    settDemoState(DemoData.FEATURE_TOGGLES, JSON.stringify(features(checked)));
};

export const settReservasjonKRR = (value: string) => {
    settDemoState(DemoData.RESERVASJON_KRR, value);
};

export const hentReservasjonKRR = (): boolean => {
    return hentDemoState(DemoData.RESERVASJON_KRR) === 'true';
};

export const settAutentiseringsInfo = () => {
    settDemoState(
        DemoData.AUTENTISERINGS_INFO,
        JSON.stringify({
            securityLevel: InnloggingsNiva.LEVEL_3,
            loggedIn: true,
        })
    );
};

export const hentAutentiseringsInfo = (): JSONObject => {
    const verdi = hentDemoState(DemoData.AUTENTISERINGS_INFO);
    return verdi
        ? JSON.parse(verdi)
        : {
              securityLevel: InnloggingsNiva.LEVEL_4,
              loggedIn: true,
          };
};

export const slettAutentiseringsInfo = () => {
    slettDemoState(DemoData.AUTENTISERINGS_INFO);
};

export const hentUnderOppfolging = (): JSONObject => {
    const verdi = hentDemoState(DemoData.UNDER_OPPFOLGING);
    return verdi ? JSON.parse(verdi) : { underOppfolging: false };
};

export const settUnderOppfolging = () => {
    settDemoState(DemoData.UNDER_OPPFOLGING, JSON.stringify({ underOppfolging: true }));
};

export const slettUnderOppfolging = () => {
    slettDemoState(DemoData.UNDER_OPPFOLGING);
};

export const hentKanReaktiveres = (): boolean => {
    return hentDemoState(DemoData.KAN_REAKTIVERES) === 'true';
};

export const settKanReaktiveres = (value: string) => {
    settDemoState(DemoData.KAN_REAKTIVERES, value);
};

export const randomUlesteDialoger = () => {
    const min = 1;
    const max = 99;
    return Math.floor(min + Math.random() * (max - min));
};

const fastsattMeldedag = foerstkommendeMandag(new Date());

export function lagMeldekortData() {
    return {
        maalformkode: 'NO',
        meldeform: 'EMELD',
        meldekort: [
            {
                meldekortId: 1526772064,
                kortType: 'ELEKTRONISK',
                meldeperiode: {
                    fra: plussDager(fastsattMeldedag, -14).toISOString(),
                    til: plussDager(fastsattMeldedag, -1).toISOString(),
                    kortKanSendesFra: plussDager(fastsattMeldedag, -2).toISOString(),
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
}

export function hentDagRelativTilFastsattMeldedag(): Date {
    const dagerEtterFastsattMeldedag = hentDagerEtterFastsattMeldedag();
    return plussDager(fastsattMeldedag, dagerEtterFastsattMeldedag);
}
