import { nanoid } from 'nanoid';

import { aiaBackendUrl, innloggingsStatusUrl } from './urls';

export enum STATUS {
    OK = 'OK',
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    RELOADING = 'RELOADING',
    ERROR = 'ERROR',
}

export interface DataElement {
    status: STATUS;
}

const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

export const requestConfig = (): RequestInit => {
    return {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
            'NAV-Consumer-Id': 'veientilarbeid',
            'NAV-Call-Id': nanoid(),
        },
    };
};

export const AIA_BACKEND = aiaBackendUrl,
    VEILARBOPPFOLGING_URL = `${AIA_BACKEND}/oppfolging`,
    BRUKERINFO_URL = `${AIA_BACKEND}/startregistrering`,
    BRUKERREGISTRERING_URL = `${AIA_BACKEND}/registrering`,
    PROFIL_URL = `${AIA_BACKEND}/profil`,
    MELDEPLIKT_URL = `${AIA_BACKEND}/meldeplikt`,
    ULESTEDIALOGER_URL = `${AIA_BACKEND}/dialog/antallUleste`,
    OPPRETT_DIALOG_URL = `${AIA_BACKEND}/dialog`,
    EGENVURDERINGBESVARELSE_URL = `${AIA_BACKEND}/vedtakinfo/besvarelse`,
    FEATURE_URL = `${AIA_BACKEND}/unleash`,
    MOTESTOTTE_URL = `${AIA_BACKEND}/vedtakinfo/motestotte`,
    DP_INNSYN_URL = `${AIA_BACKEND}/dagpenger`,
    NESTE_MELDEKORT_URL = `${AIA_BACKEND}/meldekort`,
    MELDEKORTSTATUS_URL = `${AIA_BACKEND}/meldekort/status`,
    GJELDER_FRA_DATO_URL = `${AIA_BACKEND}/gjelderfra`,
    AUTH_API = innloggingsStatusUrl,
    ARBEIDSSOKER_NIVA3_URL = `${AIA_BACKEND}/arbeidssoker?fraOgMed=2020-01-01`,
    ER_STANDARD_INNSATSGRUPPE_URL = `${AIA_BACKEND}/standard-innsats`,
    BEHOV_FOR_VEILEDNING_URL = `${AIA_BACKEND}/behov-for-veiledning`,
    DAGPENGER_STATUS = `${AIA_BACKEND}/dagpenger-status`,
    ANTATT_INAKTIVERINGSGRUNN = `${AIA_BACKEND}/data/meldekort-inaktivering`,
    REAKTIVERING_URL = `${AIA_BACKEND}/reaktivering`;
