import { contextpathDittNav, erMikrofrontend } from '../utils/app-state-utils';

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
    },
};

const contextpath = erMikrofrontend() ? contextpathDittNav : '';
const MELDEKORT_URL = `/meldekort/meldekort-api/api`;
export const VEILARBOPPFOLGING_URL = `${contextpath}/veilarboppfolging/api/oppfolging`,
    UNDER_OPPFOLGING_URL = `${contextpath}/veilarboppfolging/api/niva3/underoppfolging`,
    BRUKERINFO_URL = `${contextpath}/veilarbregistrering/api/startregistrering`,
    BRUKERREGISTRERING_URL = `${contextpath}/veilarbregistrering/api/registrering`,
    ULESTEDIALOGER_URL = `${contextpath}/veilarbdialog/api/dialog/antallUleste`,
    EGENVURDERINGBESVARELSE_URL = `${contextpath}/veilarbvedtakinfo/api/behovsvurdering/besvarelse`,
    FEATURE_URL = `${contextpath}/api/feature`,
    MOTESTOTTE_URL = `${contextpath}/veilarbvedtakinfo/api/motestotte`,
    NESTE_MELDEKORT_URL = `${MELDEKORT_URL}/person/meldekort`,
    PAABEGYNTE_SOKNADER_URL = `${contextpath}/saksoversikt-api/tjenester/saker/hentPaabegynteSoknader`,
    SAKSTEMA_URL = `${contextpath}/saksoversikt-api/tjenester/sakstema`,
    DP_INNSYN_URL = `${contextpath}/dp-innsyn-api`,
    AUTH_PROXY_URL = `${contextpath}/auth-proxy`,
    MELDEKORTSTATUS_URL = `${MELDEKORT_URL}/person/meldekortstatus`;
