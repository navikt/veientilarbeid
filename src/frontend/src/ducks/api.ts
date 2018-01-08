import { fetchToJson } from './utils';
export const VEILARBOPPFOLGING_URL = '/veilarboppfolgingproxy/api/startregistrering';

export function hentRegistreringStatus() {
    return fetchToJson(VEILARBOPPFOLGING_URL);
}