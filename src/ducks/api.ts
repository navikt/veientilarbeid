import { fetchToJson } from './api-utils';
import { alleFeatureToggles } from './feature-toggles';
export const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolgingproxy/api';
export const VEILARBREGISTRERING_URL = '/veilarbregistrering/api';
export const FEATURE_URL = '/feature';

export const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

function getHeaders() {
    return new Headers({
        'Content-Type': 'application/json',
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
    });
}

const CREDENTIALS_SAME_ORIGIN = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentRegistreringStatus() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`,
        config: {
            ...CREDENTIALS_SAME_ORIGIN,
            headers: getHeaders(),
        }
    });
}

export function hentFeatureToggles() {
    if (alleFeatureToggles.length === 0) {
        return Promise.resolve({});
    }
    const parameters = alleFeatureToggles.map(element => 'feature=' + element).join('&');
    return fetchToJson({
        url: `${FEATURE_URL}/?${parameters}`,
        config: CREDENTIALS_SAME_ORIGIN,
        recoverWith: () => ({})
    });
}