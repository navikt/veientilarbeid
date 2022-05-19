import { contextpathDittNav, erMikrofrontend } from '../utils/app-state-utils';
import { nanoid } from 'nanoid';

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

export const requestConfig: RequestInit = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
        'NAV-Consumer-Id': 'veientilarbeid',
        'NAV-Call-Id': nanoid(),
    },
};

const contextpath = erMikrofrontend() ? contextpathDittNav : '';
const MELDEKORT_URL = `/meldekort/meldekort-api/api`;
export const BAKVEIEN = `${contextpath}/bakveientilarbeid`,
    VEILARBOPPFOLGING_URL = `${BAKVEIEN}/oppfolging`,
    UNDER_OPPFOLGING_URL = `${BAKVEIEN}/underoppfolging`,
    BRUKERINFO_URL = `${BAKVEIEN}/startregistrering`,
    BRUKERREGISTRERING_URL = `${BAKVEIEN}/registrering`,
    ULESTEDIALOGER_URL = `${BAKVEIEN}/antallUleste`,
    EGENVURDERINGBESVARELSE_URL = `${BAKVEIEN}/vedtakinfo/besvarelse`,
    FEATURE_URL = `${contextpath}/api/feature`,
    MOTESTOTTE_URL = `${BAKVEIEN}/vedtakinfo/motestotte`,
    NESTE_MELDEKORT_URL = `${MELDEKORT_URL}/person/meldekort`,
    PAABEGYNTE_SOKNADER_URL = `${contextpath}/saksoversikt-api/tjenester/saker/hentPaabegynteSoknader`,
    SAKSTEMA_URL = `${contextpath}/saksoversikt-api/tjenester/sakstema`,
    DP_INNSYN_URL = `${BAKVEIEN}/dagpenger`,
    MELDEKORTSTATUS_URL = `${MELDEKORT_URL}/person/meldekortstatus`;
