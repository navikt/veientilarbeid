import { Data as OppfolgingData } from '../../ducks/oppfolging';

export const DITTNAV_URL = '/dittnav/';

export function erUnderOppfolging(oppfolging: OppfolgingData) {
    return oppfolging.underOppfolging;
}

export function redirectTilDittNav() {
    window.location.href = DITTNAV_URL;
}
