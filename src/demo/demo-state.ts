import {JSONObject} from 'yet-another-fetch-mock';
import {FremtidigSituasjonSvar, Innsatsgruppe} from "../ducks/brukerregistrering";

export function erDemo(): boolean {
    const path: string = window.location.pathname;
    return path.includes('/demo/index.html');
}

export enum DemoData {
    SERVICEGRUPPE = 'innsatsgruppe',
    SYKMELDT_MED_ARBEIDSGIVER = 'sykmeldtMedArbeidsGiver',
    BRUKER_REGISTRERING = 'brukerRegistrering',
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

export const sjekkLocalStorage = (felt: string) => {
    const data = hentFraLocalStorage(felt);
    if (data) {
        return JSON.parse(data);
    }
    return null;
}

export const hentBrukerRegistrering = (): any => { //tslint:disable-line
    const localStorageData = sjekkLocalStorage(DemoData.BRUKER_REGISTRERING);

    if (localStorageData) {
        return localStorageData;
    }
    return {
        registrering: {
            besvarelse: {
                fremtidigSituasjon: FremtidigSituasjonSvar.NY_ARBEIDSGIVER
            },
            profilering: {
                innsatsgruppe: Innsatsgruppe.STANDARD_INNSATS
            }
        }
    };
};

export const settBrukerRegistrering = (value: string) => {
    let innsatsgruppe = Innsatsgruppe.STANDARD_INNSATS;

    const localStorageData = sjekkLocalStorage(DemoData.BRUKER_REGISTRERING);
    if (localStorageData) {
        const innsatsgruppeData = localStorageData.registrering.profilering.innsatsgruppe;
        if (innsatsgruppeData) {
            innsatsgruppe = innsatsgruppeData;
        }
    }

    const data = {
        registrering: {
            besvarelse: {
                fremtidigSituasjon: value
            },
            profilering: {
                innsatsgruppe: innsatsgruppe
            }
        }   };
    settILocalStorage(DemoData.BRUKER_REGISTRERING, JSON.stringify(data));
};

export const settForeslaattInnsatsgruppe = (value: string) => {
    let fremtidigSituasjon: FremtidigSituasjonSvar = FremtidigSituasjonSvar.NY_ARBEIDSGIVER;
    const localStorageData = sjekkLocalStorage(DemoData.BRUKER_REGISTRERING);

    if (localStorageData) {
        const fremtidigSituasjonData = localStorageData.registrering.besvarelse.fremtidigSituasjon;
        if (fremtidigSituasjonData) {
            fremtidigSituasjon = fremtidigSituasjonData;
        }
    }

    const data = {
        registrering: {
            besvarelse: {
                fremtidigSituasjon: fremtidigSituasjon
            },
            profilering: {
                innsatsgruppe: value
            }
        }
    };
    settILocalStorage(DemoData.BRUKER_REGISTRERING, JSON.stringify(data));
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
