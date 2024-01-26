import AuthResponse from './auth-mock';
import ulesteDialogerResponse from './ulestedialoger-mock';
import motestotteResponse from './motestotte-mock';
import featureTogglesResponse from './feature-toggles-mock';
import meldekortResponse from './meldekort-mock';
import meldekortstatusResponse from './meldekortstatus-mock';
import dpSoknadResonse from './dp-innsyn-soknad';
import dpVedtakResponse from './dp-innsyn-vedtak';
import dpPaabegynteResponse from './dp-innsyn-paabegynte';
import besvarelseResponse from './besvarelse-mock';
import msw_get from './msw-utils';
import {
    ANTATT_INAKTIVERINGSGRUNN,
    ARBEIDSOKER_INNHOLD,
    ARBEIDSSOKER_NIVA3_URL,
    AUTH_API,
    BEHOV_FOR_VEILEDNING_URL,
    BESVARELSE_URL,
    DAGPENGER_STATUS,
    DP_INNSYN_URL,
    ER_STANDARD_INNSATSGRUPPE_URL,
    FEATURE_URL,
    MELDEKORTSTATUS_URL,
    MELDEPLIKT_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    PROFIL_URL,
    REAKTIVERING_URL,
    ULESTEDIALOGER_URL,
    ARBEIDSOKERPERIODER_URL,
    OPPLYSNINGER_OM_ARBEIDSSOKER_URL,
    PROFILERING_URL,
} from '../ducks/api';
import arbeidssokerNiva3Response from './arbeidssoker-niva3-mock';
import levertMeldekortMock from './meldeplikt-hendelser.mock';
import arbeidssokerInnholdMock from './arbeidssoker-innhold-mock';
import arbeidssokerperioderMock from './arbeidssokerperioder-mock';
import opplysningerOmArbeidssoker from './opplysninger-om-arbeidssoker-mock';
import profileringMock from './profilering-mock';

export const handlers = [
    msw_get(AUTH_API, AuthResponse),
    msw_get(MOTESTOTTE_URL, motestotteResponse, 204),
    msw_get(FEATURE_URL, featureTogglesResponse),
    msw_get(ULESTEDIALOGER_URL, ulesteDialogerResponse),
    msw_get(BESVARELSE_URL, besvarelseResponse),
    msw_get(NESTE_MELDEKORT_URL, meldekortResponse),
    msw_get(MELDEKORTSTATUS_URL, meldekortstatusResponse),
    msw_get(`${DP_INNSYN_URL}/soknad`, dpSoknadResonse),
    msw_get(`${DP_INNSYN_URL}/vedtak`, dpVedtakResponse),
    msw_get(`${DP_INNSYN_URL}/paabegynte`, dpPaabegynteResponse),
    msw_get(ARBEIDSSOKER_NIVA3_URL, arbeidssokerNiva3Response(true, null)),
    msw_get(ER_STANDARD_INNSATSGRUPPE_URL, true),
    msw_get(`${MELDEPLIKT_URL}/siste`, levertMeldekortMock(true)),
    msw_get(DAGPENGER_STATUS, { dagpengerStatus: 'ukjent', antallDagerSidenDagpengerStanset: 'N/A' }),
    msw_get(ANTATT_INAKTIVERINGSGRUNN, { meldekortStatus: 'N/A' }),
    msw_get(BEHOV_FOR_VEILEDNING_URL, null, 204),
    msw_get(PROFIL_URL, null, 204),
    msw_get(REAKTIVERING_URL, null, 204),
    msw_get(ARBEIDSOKER_INNHOLD, arbeidssokerInnholdMock, 200),
    msw_get(ARBEIDSOKERPERIODER_URL, arbeidssokerperioderMock, 200),
    msw_get(`${OPPLYSNINGER_OM_ARBEIDSSOKER_URL}/*`, opplysningerOmArbeidssoker, 200),
    msw_get(`${PROFILERING_URL}/*`, profileringMock, 200),
];
