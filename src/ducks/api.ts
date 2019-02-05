import { fetchToJson } from './api-utils';
import { FeatureToggleState } from './feature-toggles';
import { Data as OppfolgingData } from './oppfolging';
import { State as ServicegruppeState } from './servicegruppe';
import { Data as JobbsokerbesvarelseData } from './jobbsokerbesvarelse';
import { State as SykmeldtInfoState } from './sykmeldt-info';

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

export const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

const requestConfig: RequestInit = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
    }
};

export const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolging/api',
             FEATURE_URL = '/veientilarbeid/api/feature',
             SERVICEGRUPPE_URL = '/veilarbtiltakinfo/api/oppfolgingsstatus',
             STARTREGISTRERING_URL = '/veilarbregistrering/api/startregistrering',
             JOBBSOKERBESVARELSE_URL = '/veilarbjobbsokerkompetanse/api/hent';

export const featureQueryParams = (features: string[]): string => {
    const reduceFunc = (acc: string, toggle: string, i: number) => `${acc}${i === 0 ? '?' : '&'}feature=${toggle}`;
    return features.reduce(reduceFunc, '');
};

export function hentFeatureTogglesFetch(features: string[]): Promise<FeatureToggleState> {
    const unleashUrl = FEATURE_URL + featureQueryParams(features);
    return fetchToJson<FeatureToggleState>(unleashUrl, requestConfig);
}

export function hentOppfolgingFetch(): Promise<OppfolgingData> {
    return fetchToJson(`${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`, requestConfig);
}

export function hentServicegruppeFetch(): Promise<ServicegruppeState> {
    return fetchToJson(SERVICEGRUPPE_URL, requestConfig);
}

export function hentJobbsokerbesvarelseFetch(): Promise<JobbsokerbesvarelseData> {
    return fetchToJson(JOBBSOKERBESVARELSE_URL, requestConfig);
}

export function hentSykmeldtInfoFetch(): Promise<SykmeldtInfoState> {
    return fetchToJson(STARTREGISTRERING_URL, requestConfig);
}
