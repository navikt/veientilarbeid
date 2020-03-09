import { fetchToJson } from './api-utils';
import { Data as JobbsokerbesvarelseData } from './jobbsokerbesvarelse';
import { Data as UlesteDialogerData } from './dialog';
import { Data as EgenvurderingbesvarelseData } from './egenvurdering';
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
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
    }
};

const contextpath = erMikrofrontend() ? contextpathDittNav : '';

export const VEILARBOPPFOLGING_URL = `${contextpath}/veilarboppfolging/api/oppfolging`,
    BRUKERINFO_URL = `${contextpath}/veilarbregistrering/api/startregistrering`,
    BRUKERREGISTRERING_URL = `${contextpath}/veilarbregistrering/api/registrering`,
    JOBBSOKERBESVARELSE_URL = `${contextpath}/veilarbjobbsokerkompetanse/api/hent`,
    ULESTEDIALOGER_URL = `${contextpath}/veilarbdialog/api/dialog/antallUleste`,
    EGENVURDERINGBESVARELSE_URL = `${contextpath}/veilarbvedtakinfo/api/behovsvurdering/besvarelse`,
    FEATURE_URL = `${contextpath}/api/feature`,
    MOTESTOTTE_URL = `${contextpath}/veilarbvedtakinfo/api/motestotte`;

export function hentJobbsokerbesvarelseFetch(): Promise<JobbsokerbesvarelseData> {
    return fetchToJson(JOBBSOKERBESVARELSE_URL, requestConfig);
}

export function hentUlesteDialogerFetch(): Promise<UlesteDialogerData> {
    return fetchToJson(ULESTEDIALOGER_URL, requestConfig);
}

export function hentEgenvurderingbesvarelseFetch(): Promise<EgenvurderingbesvarelseData> {
    return fetchToJson(EGENVURDERINGBESVARELSE_URL, requestConfig);
}
