import { JSONObject } from 'yet-another-fetch-mock';
import { InnloggingsNiva } from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';

export enum DemoData {
    INNSATSGRUPPE = 'innsatsgruppe',
    SYKMELDT_MED_ARBEIDSGIVER = 'sykmeldtMedArbeidsGiver',
    BRUKER_REGISTRERING = 'brukerRegistrering',
    JSK = 'jsk',
    ULESTE_DIALOGER = 'ulesteDialoger',
    RESERVASJON_KRR = 'reservasjonKRR',
    EGENVURDERING = 'egenvurdering',
    AUTENTISERINGS_INFO = 'autentiseringsInfo',
}

export const hentFraLocalStorage = (key: string): string | null => {
    return window.localStorage.getItem(key);
};

export const settILocalStorage = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
};

const slettFraLocalStorage = (key: string): void => {
    window.localStorage.removeItem(key);
};

export const hentInnsatsgruppe = (): string => {
    return hentFraLocalStorage(DemoData.INNSATSGRUPPE) || 'IKVAL';
};

export const settInnsatsgruppe = (value: string) => {
    settILocalStorage(DemoData.INNSATSGRUPPE, value);
};

export const hentSykmeldtMedArbeidsgiver = (): boolean => {
    return hentFraLocalStorage(DemoData.SYKMELDT_MED_ARBEIDSGIVER) === 'true';
};

export const settSykmeldtMedArbeidsgiver = (value: string) => {
    settILocalStorage(DemoData.SYKMELDT_MED_ARBEIDSGIVER, value);
};

export const hentUlesteDialoger = (): boolean => {
    return hentFraLocalStorage(DemoData.ULESTE_DIALOGER) === 'true';
};

export const settUlesteDialoger = (value: string) => {
    settILocalStorage(DemoData.ULESTE_DIALOGER, value);
};

export const hentJsk = (): JSONObject | null => {
    const verdi = hentFraLocalStorage(DemoData.JSK);
    return verdi ? JSON.parse(verdi) : null;
};

export const settJsk = () => {
    settILocalStorage(DemoData.JSK, JSON.stringify({raad: []}));
};

export const slettJsk = () => {
    slettFraLocalStorage(DemoData.JSK);
};

export const hentEgenvurdering = (): JSONObject | null => {
    const verdi = hentFraLocalStorage(DemoData.EGENVURDERING);
    return verdi ? JSON.parse(verdi) : null;
};

export const settEgenvurdering = () => {
    settILocalStorage(DemoData.EGENVURDERING, JSON.stringify({sistOppdatert: '2019-05-06T09:39:01.635+02:00'}));
};

export const slettEgenvurdering = () => {
    slettFraLocalStorage(DemoData.EGENVURDERING);
};

export const settReservasjonKRR = (value: string) => {
    settILocalStorage(DemoData.RESERVASJON_KRR, value);
};

export const hentReservasjonKRR = (): boolean => {
    return hentFraLocalStorage(DemoData.RESERVASJON_KRR) === 'true';
};

export const settAutentiseringsInfo = () => {
    settILocalStorage(DemoData.AUTENTISERINGS_INFO, JSON.stringify({
        securityLevel: InnloggingsNiva.LEVEL_3,
        isLoggedIn: true,
    }));
};

export const hentAutentiseringsInfo = (): JSONObject => {
    const verdi = hentFraLocalStorage(DemoData.AUTENTISERINGS_INFO);
    return verdi ? JSON.parse(verdi) : {
        securityLevel: InnloggingsNiva.LEVEL_4,
        isLoggedIn: true,
    };
};

export const slettAutentiseringsInfo = () => {
    slettFraLocalStorage(DemoData.AUTENTISERINGS_INFO);
};
