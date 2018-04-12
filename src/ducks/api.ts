import { fetchToJson } from './api-utils';
export const VEILARBOPPFOLGINGPROXY_URL = '/veilarboppfolgingproxy/api';

const CREDENTIALS_SAME_ORIGIN = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentOppfolging() {
    return fetchToJson({
        url: `${VEILARBOPPFOLGINGPROXY_URL}/oppfolging`,
        config: CREDENTIALS_SAME_ORIGIN
    });
}
