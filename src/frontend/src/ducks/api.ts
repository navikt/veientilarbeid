import { fetchToJson } from './api-utils';
export const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolgingproxy/api';
export const VEIENTILARBEID = '/veientilarbeid';
export const VEILARBSTEPUP = `/veilarbstepup/niva/4?url=${VEIENTILARBEID}`;
export const INNLOGGINGSINFO_URL = '/innloggingslinje/auth';

const CREDENTIALS_SAME_ORIGIN = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentOppfolging() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`,
        config: CREDENTIALS_SAME_ORIGIN
    });
}

export function hentInnloggingsInfo() {
    return fetchToJson({
        url: `${INNLOGGINGSINFO_URL}?randomness=${Math.random()}`,
        config: CREDENTIALS_SAME_ORIGIN
    });
}
