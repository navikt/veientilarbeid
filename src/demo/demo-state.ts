import { JSONObject } from 'yet-another-fetch-mock';

export function erDemo(): boolean {
    const path: string = window.location.pathname;
    return path.includes('/veientilarbeid/demo/index.html');
}

export enum DemoData {
    SERVICEGRUPPE = 'innsatsgruppe',
    SYKMELDT_MED_ARBEIDSGIVER = 'sykmeldtMedArbeidsGiver',
    JSK = 'jsk',
    ULESTE_DIALOGER = 'ulesteDialoger',
}

const hentFraLocalStorage = (key: string): string | null => {
    return window.localStorage.getItem(key);
};

const settILocalStorage = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
};

const slettFraLocalStorage = (key: string): void => {
    window.localStorage.removeItem(key);
};

export const hentServicegruppe = (): string => {
    return hentFraLocalStorage(DemoData.SERVICEGRUPPE) || 'IKVAL';
};

export const settServicegruppe = (value: string) => {
    settILocalStorage(DemoData.SERVICEGRUPPE, value);
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
