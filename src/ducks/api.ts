import { fetchToJson } from './api-utils';
import { Data as OppfolgingData } from './oppfolging';
import { FetchData as InnsatsgruppeData } from './innsatsgruppe';
import { Data as JobbsokerbesvarelseData } from './jobbsokerbesvarelse';
import { Data as SykmeldtInfoData } from './sykmeldt-info';
import { Data as BrukerRegistreringData } from './brukerregistrering';
import { Data as UlesteDialogerData } from './dialog';
import { Data as EgenvurderingbesvarelseData } from './egenvurdering';
import { FeatureToggles } from './feature-toggles';
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

const contextpathFeature = erMikrofrontend() ? contextpathDittNav : '/veientilarbeid';

export const VEILARBOPPFOLGING_URL = `${contextpath}/veilarboppfolging/api/oppfolging`,
    FEATURE_URL = `${contextpathFeature}/api/feature`,
    INNSATSGRUPPE_URL = `${contextpath}/veilarbtiltakinfo/api/oppfolgingsstatus`,
    STARTREGISTRERING_URL = `${contextpath}/veilarbregistrering/api/startregistrering`,
    BRUKERREGISTRERING_URL = `${contextpath}/veilarbregistrering/api/registrering`,
    JOBBSOKERBESVARELSE_URL = `${contextpath}/veilarbjobbsokerkompetanse/api/hent`,
    ULESTEDIALOGER_URL = `${contextpath}/veilarbdialog/api/dialog/antallUleste`,
    EGENVURDERINGBESVARELSE_URL = '/veilarbvedtakinfo/api/behovsvurdering/besvarelse';

export const featureQueryParams = (features: string[]): string => {
    const reduceFunc = (acc: string, toggle: string, i: number) => `${acc}${i === 0 ? '?' : '&'}feature=${toggle}`;
    return features.reduce(reduceFunc, '');
};

export function hentFeatureTogglesFetch(features: string[]): Promise<FeatureToggles> {
    const unleashUrl = FEATURE_URL + featureQueryParams(features);
    return fetchToJson<FeatureToggles>(unleashUrl, requestConfig);
}

export function hentOppfolgingFetch(): Promise<OppfolgingData> {
    return fetchToJson(VEILARBOPPFOLGING_URL, requestConfig);
}

export function hentInnsatsgruppeFetch(): Promise<InnsatsgruppeData> {
    return fetchToJson(INNSATSGRUPPE_URL, requestConfig);
}

export function hentJobbsokerbesvarelseFetch(): Promise<JobbsokerbesvarelseData> {
    return fetchToJson(JOBBSOKERBESVARELSE_URL, requestConfig);
}

export function hentSykmeldtInfoFetch(): Promise<SykmeldtInfoData> {
    return fetchToJson(STARTREGISTRERING_URL, requestConfig);
}

export function hentBrukerRegistreringFetch(): Promise<BrukerRegistreringData> {
    return fetchToJson(BRUKERREGISTRERING_URL, requestConfig);
}

export function hentUlesteDialogerFetch(): Promise<UlesteDialogerData> {
    return fetchToJson(ULESTEDIALOGER_URL, requestConfig);
}

export function hentEgenvurderingbesvarelseFetch(): Promise<EgenvurderingbesvarelseData> {
    return fetchToJson(EGENVURDERINGBESVARELSE_URL, requestConfig);
}