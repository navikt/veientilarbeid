import { fetchToJson } from './utils';
export const VEILARBOPPFOLGING_URL = '/veilarboppfolgingproxy/api/krr';

export function hentKrrStatus() {
    return fetchToJson({url: VEILARBOPPFOLGING_URL, recoverWith});
}

function recoverWith(status: number) {
    if (status === 404) {
        return { reservertIKrr: true};
    } else if (status >= 500) {
        return { reservertIKrr: false };
    } else {
        return null;
    }
}
