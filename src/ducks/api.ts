import { fetchToJson } from './api-utils';
import { alleFeatureToggles } from './feature-toggles';
export const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolgingproxy/api';
export const FEATURE_URL = '/feature';

const CREDENTIALS_SAME_ORIGIN = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentOppfolging() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`,
        config: CREDENTIALS_SAME_ORIGIN
    });
}

export function hentFeatureToggles() {
    const parameters = alleFeatureToggles.map(element => 'feature=' + element).join('&');
    return fetchToJson({
        url: `${FEATURE_URL}/?${parameters}`,
        config: CREDENTIALS_SAME_ORIGIN,
        recoverWith: () => ({})
    });
}