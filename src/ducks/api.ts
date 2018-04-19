import { fetchToJson } from './api-utils';
export const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolgingproxy/api';
export const VEILEDERARBEIDSSOKER_URL = '/veiledearbeidssoker/api';

const CREDENTIALS_SAME_ORIGIN = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentOppfolging() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`,
        config: CREDENTIALS_SAME_ORIGIN
    });
}

export function hentTekster() {
    return fetchToJson({
        url: `${VEILEDERARBEIDSSOKER_URL}/tekster`,
        config: CREDENTIALS_SAME_ORIGIN
    });
}