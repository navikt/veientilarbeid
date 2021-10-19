import { AUTH_API } from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';
import AuthResponse from './auth-mock';
import ulesteDialogerResponse from './ulestedialoger-mock';
import egenvurderingbesvarelseResponse from './egenvurderingbesvarelse-mock';
import brukerRegistreringResponse from './brukerregistrering-mock';
import motestotteResponse from './motestotte-mock';
import featureTogglesResponse from './feature-toggles-mock';
import brukerInfoResponse from './bruker-info-mock';
import oppfolgingResponse from './oppfolging-mock';
import underOppfolgingResponse from './under-oppfolging-mock';
import meldekortResponse from './meldekort-mock';
import meldekortstatusResponse from './meldekortstatus-mock';
import paabegynteSoknaderResponse from './saksoversikt-pabegyntesoknader-mock';
import muligeEttersendelserResponse from './saksoversikt-mulige-ettersendelser-mock';
import sakstemaResponse from './saksoversikt-sakstema-mock';
import msw_get from './msw-utils';
import {
    BRUKERINFO_URL,
    BRUKERREGISTRERING_URL,
    EGENVURDERINGBESVARELSE_URL,
    FEATURE_URL,
    MELDEKORTSTATUS_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    ULESTEDIALOGER_URL,
    UNDER_OPPFOLGING_URL,
    VEILARBOPPFOLGING_URL,
    PAABEGYNTE_SOKNADER_URL,
    MULIGE_ETTERSENDELSER_URL,
    SAKSTEMA_URL,
} from '../ducks/api';

export const handlers = [
    msw_get(AUTH_API, AuthResponse),
    msw_get(MOTESTOTTE_URL, motestotteResponse, 204),
    msw_get(FEATURE_URL, featureTogglesResponse),
    msw_get(EGENVURDERINGBESVARELSE_URL, egenvurderingbesvarelseResponse),
    msw_get(BRUKERREGISTRERING_URL, brukerRegistreringResponse),
    msw_get(ULESTEDIALOGER_URL, ulesteDialogerResponse),
    msw_get(BRUKERINFO_URL, brukerInfoResponse),
    msw_get(VEILARBOPPFOLGING_URL, oppfolgingResponse),
    msw_get(UNDER_OPPFOLGING_URL, underOppfolgingResponse),
    msw_get(NESTE_MELDEKORT_URL, meldekortResponse),
    msw_get(MELDEKORTSTATUS_URL, meldekortstatusResponse),
    msw_get(PAABEGYNTE_SOKNADER_URL, paabegynteSoknaderResponse),
    msw_get(MULIGE_ETTERSENDELSER_URL, muligeEttersendelserResponse),
    msw_get(SAKSTEMA_URL, sakstemaResponse),
];
