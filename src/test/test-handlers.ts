import msw_get, { msw_post } from '../mocks/msw-utils';
import {
    ANTATT_INAKTIVERINGSGRUNN,
    ARBEIDSOKER_INNHOLD,
    ARBEIDSSOKER_NIVA3_URL,
    AUTH_API,
    BEHOV_FOR_VEILEDNING_URL,
    DAGPENGER_STATUS,
    DP_INNSYN_URL,
    ER_STANDARD_INNSATSGRUPPE_URL,
    FEATURE_URL,
    GJELDER_FRA_DATO_URL,
    KAN_REAKTIVERES_URL,
    MELDEKORTSTATUS_URL,
    MELDEPLIKT_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    PROFIL_URL,
    REAKTIVERING_URL,
    ULESTEDIALOGER_URL,
} from '../ducks/api';
import { authenticatedMock } from '../mocks/auth-mock';
import { InnloggingsNiva } from '../contexts/autentisering';
import arbeidssoker from '../mocks/arbeidssoker-niva3-mock';
import { AMPLITUDE_ENDPOINT } from '../utils/konstanter';
import motestotteResponse from '../mocks/motestotte-mock';
import ulesteDialogerResponse from '../mocks/ulestedialoger-mock';
import meldekortResponse from '../mocks/meldekort-mock';
import meldekortstatusResponse from '../mocks/meldekortstatus-mock';
import dpSoknadResonse from '../mocks/dp-innsyn-soknad';
import dpVedtakResponse from '../mocks/dp-innsyn-vedtak';
import dpPaabegynteResponse from '../mocks/dp-innsyn-paabegynte';
import gjelderFraGetResponse from '../mocks/gjelderfra-mock';
import arbeidssokerInnholdMock from '../mocks/arbeidssoker-innhold-mock';

export const initielleKallHandlers = [
    msw_get(AUTH_API, authenticatedMock(InnloggingsNiva.LEVEL_4)),
    msw_get(ARBEIDSSOKER_NIVA3_URL.split('?')[0], arbeidssoker(true, 'aktiv')),
    msw_get(FEATURE_URL, {}),
    msw_post(AMPLITUDE_ENDPOINT, {}),
    msw_get(PROFIL_URL, {}),
    msw_post('https://amplitude.nav.no/collect', {}),
    msw_get(GJELDER_FRA_DATO_URL, gjelderFraGetResponse),
    msw_post(GJELDER_FRA_DATO_URL, null, 201),
    msw_get(ARBEIDSOKER_INNHOLD, arbeidssokerInnholdMock, 200),
    msw_get(DAGPENGER_STATUS, null, 204),
    msw_get(ANTATT_INAKTIVERINGSGRUNN, { meldekortStatus: 'N/A' }),
    msw_get(BEHOV_FOR_VEILEDNING_URL, null, 204),
    msw_get(NESTE_MELDEKORT_URL, meldekortResponse),
    msw_get(KAN_REAKTIVERES_URL, { kanReaktiveres: true }),
    msw_get(PROFIL_URL, null, 204),
    msw_get(REAKTIVERING_URL, null, 204),
    msw_get(ARBEIDSOKER_INNHOLD, arbeidssokerInnholdMock, 200),
    msw_get(MOTESTOTTE_URL, motestotteResponse, 204),
];

export const standardHandlers = [
    msw_get(ER_STANDARD_INNSATSGRUPPE_URL, true),
    msw_get(MOTESTOTTE_URL, motestotteResponse, 204),
    msw_get(ULESTEDIALOGER_URL, ulesteDialogerResponse),
    msw_get(MELDEKORTSTATUS_URL, meldekortstatusResponse),
    msw_get(`${DP_INNSYN_URL}/soknad`, dpSoknadResonse),
    msw_get(`${DP_INNSYN_URL}/vedtak`, dpVedtakResponse),
    msw_get(`${DP_INNSYN_URL}/paabegynte`, dpPaabegynteResponse),
    msw_get(REAKTIVERING_URL, null, 204),
    msw_get(KAN_REAKTIVERES_URL, { kanReaktiveres: true }),
    msw_get(`${MELDEPLIKT_URL}/siste`, null, 204),
];

export const ikkeStandardHandlers = [
    msw_get(ER_STANDARD_INNSATSGRUPPE_URL, false),
    msw_get(MOTESTOTTE_URL, motestotteResponse, 204),
    msw_get(REAKTIVERING_URL, null, 204),
    msw_get(KAN_REAKTIVERES_URL, { kanReaktiveres: true }),
];
