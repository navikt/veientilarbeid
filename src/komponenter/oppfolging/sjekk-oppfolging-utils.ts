import { Data as OppfolgingData } from '../../ducks/oppfolging';

export const AKTIVITETSPLAN_URL = '/aktivitetsplan';
export const DITTNAV_URL = '/dittnav';

export function erUnderOppfolging(oppfolging: OppfolgingData) {
    return oppfolging.underOppfolging;
}

export function harTattIBrukAktivitetsplan(oppfolging: OppfolgingData) {
    return !oppfolging.vilkarMaBesvares;
}

export function sendBrukerTilAktivitetsplan() {
    history.pushState({}, 'aktivitetsplan', AKTIVITETSPLAN_URL);
}

export function sendBrukerTilDittNav() {
    history.pushState({}, 'dittnavn', DITTNAV_URL);
}
