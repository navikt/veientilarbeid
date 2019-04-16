import { JSONObject } from 'yet-another-fetch-mock';
import {
    Besvarelse,
    ForeslattInnsatsgruppe,
    FremtidigSituasjonSvar,
    Profilering
} from '../ducks/brukerregistrering';

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

const settRegistrering = (besvarelse?: Besvarelse, profilering?: Profilering) => {
    const data = {
        registrering: {
            besvarelse: besvarelse || {fremtidigSituasjon: hentFremtidigSituasjon()},
            profilering: profilering || {innsatsgruppe: hentForeslattInnsatsgruppe()},
        }
    };

    settILocalStorage(DemoData.BRUKER_REGISTRERING, JSON.stringify(data));
};

export const settFremtidigSituasjon = (fremtidigSituasjon: FremtidigSituasjonSvar) => {
    settRegistrering(
        {fremtidigSituasjon: fremtidigSituasjon},
        undefined,
    );
};

export const settForeslattInnsatsgruppe = (innsatsgruppe: ForeslattInnsatsgruppe) => {
    settRegistrering(
        undefined,
        {
            innsatsgruppe: innsatsgruppe,
        }
    )
};

const defaultFremtidigSituasjon = FremtidigSituasjonSvar.NY_ARBEIDSGIVER;
const defaultForeslattInnsatsgruppe = ForeslattInnsatsgruppe.STANDARD_INNSATS;

export const hentBrukerRegistreringData = () => {
    const data = hentFraLocalStorage(DemoData.BRUKER_REGISTRERING);

    return data ? JSON.parse(data) : {
        registrering: {
            besvarelse: {
                fremtidigSituasjon: defaultFremtidigSituasjon,
            },
            profilering: {
                innsatsgruppe: defaultForeslattInnsatsgruppe,
            }
        }
    };

};

export const hentFremtidigSituasjon = (): string => {
    const data = hentBrukerRegistreringData();

    if (data.registrering && data.registrering.besvarelse && data.registrering.besvarelse.fremtidigSituasjon) {
        return data.registrering.besvarelse.fremtidigSituasjon;
    }

    return defaultFremtidigSituasjon;
};

export const hentForeslattInnsatsgruppe = (): string => {
    const data = hentBrukerRegistreringData();

    if (data.registrering && data.registrering.profilering && data.registrering.profilering.innsatsgruppe) {
        return data.registrering.profilering.innsatsgruppe;
    }

    return defaultForeslattInnsatsgruppe;
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
