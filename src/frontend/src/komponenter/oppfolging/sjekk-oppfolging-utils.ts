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
    document.location.href = AKTIVITETSPLAN_URL;
}

export function sendBrukerTilDittNav() {
    document.location.href = DITTNAV_URL;
}