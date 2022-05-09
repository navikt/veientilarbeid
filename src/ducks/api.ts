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
export const VEILARBOPPFOLGING_URL = `${contextpath}/veilarboppfolging/api/oppfolging`,
    UNDER_OPPFOLGING_URL = `${contextpath}/veilarboppfolging/api/niva3/underoppfolging`,
    BRUKERINFO_URL = `${contextpath}/veilarbregistrering/api/startregistrering`,
    BRUKERREGISTRERING_URL = `${contextpath}/veilarbregistrering/api/registrering`,
    ULESTEDIALOGER_URL = `${contextpath}/veilarbdialog/api/dialog/antallUleste`,
    EGENVURDERINGBESVARELSE_URL = `${contextpath}/veilarbvedtakinfo/api/behovsvurdering/besvarelse`,
    FEATURE_URL = `${contextpath}/api/feature`,
    MOTESTOTTE_URL = `${contextpath}/veilarbvedtakinfo/api/motestotte`,
    PAABEGYNTE_SOKNADER_URL = `${contextpath}/saksoversikt-api/tjenester/saker/hentPaabegynteSoknader`,
    SAKSTEMA_URL = `${contextpath}/saksoversikt-api/tjenester/sakstema`,
    BAKVEIEN = `${contextpath}/bakveientilarbeid`,
    DP_INNSYN_URL = `${BAKVEIEN}/dagpenger`,
    NESTE_MELDEKORT_URL = `${BAKVEIEN}/meldekort`,
    MELDEKORTSTATUS_URL = `${BAKVEIEN}/meldekort/status`;
