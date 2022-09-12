import AuthResponse from './auth-mock';
import ulesteDialogerResponse from './ulestedialoger-mock';
import egenvurderingbesvarelseResponse from './egenvurderingbesvarelse-mock';
import brukerRegistreringResponse from './brukerregistrering-standard-mock';
import motestotteResponse from './motestotte-mock';
import featureTogglesResponse from './feature-toggles-mock';
import brukerInfoResponse from './bruker-info-mock';
import oppfolgingResponse from './oppfolging-mock';
import underOppfolgingResponse from './under-oppfolging-mock';
import meldekortResponse from './meldekort-mock';
import meldekortstatusResponse from './meldekortstatus-mock';
import dpSoknadResonse from './dp-innsyn-soknad';
import dpVedtakResponse from './dp-innsyn-vedtak';
import dpPaabegynteResponse from './dp-innsyn-paabegynte';
import arbeidssokerPerioderResponse from './arbeidssoker-perioder-mock';
import msw_get, { msw_post } from './msw-utils';
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
    DP_INNSYN_URL,
    GJELDER_FRA_DATO_URL,
    AUTH_API,
    ARBEIDSSOKERPERIODER_URL,
    ARBEIDSSOKER_NIVA3_URL,
    ER_STANDARD_INNSATSGRUPPE_URL,
} from '../ducks/api';
import gjelderFraGetResponse from './gjelderfra-mock';
import arbeidssokerNiva3Response from './arbeidssoker-niva3-mock';
import { erStandardInnsatsgruppe } from './er-standard-innsatsgruppe';

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
    msw_get(`${DP_INNSYN_URL}/soknad`, dpSoknadResonse),
    msw_get(`${DP_INNSYN_URL}/vedtak`, dpVedtakResponse),
    msw_get(`${DP_INNSYN_URL}/paabegynte`, dpPaabegynteResponse),
    msw_get(GJELDER_FRA_DATO_URL, gjelderFraGetResponse),
    msw_post(GJELDER_FRA_DATO_URL, null, 201),
    msw_get(ARBEIDSSOKERPERIODER_URL, arbeidssokerPerioderResponse),
    msw_get(ARBEIDSSOKER_NIVA3_URL, arbeidssokerNiva3Response),
    msw_get(ER_STANDARD_INNSATSGRUPPE_URL, erStandardInnsatsgruppe),
];
