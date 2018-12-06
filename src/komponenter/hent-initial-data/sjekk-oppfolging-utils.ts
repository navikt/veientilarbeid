import { Data as OppfolgingData } from '../../ducks/oppfolging';

export const AKTIVITETSPLAN_REDIRECT_URL = '/aktivitetsplan/?redirected=true';
export const DITTNAV_URL = '/dittnav/';
export const SYKEFRAVAR_ARBEIDSRETTET_OPPFOLGING_URL = '/sykefravaer/arbeidsrettet-oppfolging/';

export function erSykmeldt(oppfolging: OppfolgingData) {
    return oppfolging.erSykmeldtMedArbeidsgiver;
}

export function erUnderOppfolging(oppfolging: OppfolgingData) {
    return oppfolging.underOppfolging;
}

export function redirectTilAktivitetsplan() {
    window.location.href = AKTIVITETSPLAN_REDIRECT_URL;
}

export function redirectTilDittNav() {
    window.location.href = DITTNAV_URL;
}

export function redirectTilSykefravarArbrettetOppfolg() {
    window.location.href = SYKEFRAVAR_ARBEIDSRETTET_OPPFOLGING_URL;
}
