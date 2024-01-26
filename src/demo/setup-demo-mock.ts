import { http, HttpResponse } from 'msw';

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
    FULLFOER_REAKTIVERING_URL,
    KAN_REAKTIVERES_URL,
    MELDEKORTSTATUS_URL,
    MELDEPLIKT_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    OPPRETT_DIALOG_URL,
    OPPRETT_OPPGAVE_URL,
    PROFIL_URL,
    REAKTIVERING_URL,
    ULESTEDIALOGER_URL,
    ARBEIDSOKERPERIODER_URL,
    OPPLYSNINGER_OM_ARBEIDSSOKER_URL,
} from '../ducks/api';

import {
    DemoData,
    hentAutentiseringsInfo,
    hentDemoState,
    hentDpInnsynPaabegynte,
    hentDpInnsynSoknad,
    hentDpInnsynVedtak,
    hentFeatureToggles,
    hentMotestotte,
    hentStandardInnsatsgruppe,
    hentUlesteDialoger,
    hentUnderOppfolging,
    lagMeldekortData,
    randomUlesteDialoger,
    settArbeidssokerPeriode,
} from './demo-state';

import { telemetryUrl } from '../innhold/lenker';
import msw_get from '../mocks/msw-utils';
import meldekortstatusResponse from '../mocks/meldekortstatus-mock';
import { besvarelseGetResolver, besvarelsePostResolver } from './demo-state-besvarelse';
import { brukerProfilGetResolver, brukerProfilPostResolver } from './demo-state-profil';
import { reaktiveringGetResolver, reaktiveringPostResolver } from './demo-state-reaktivering';
import arbeidssokerNiva3Response, { ArbeidssokerPeriode } from '../mocks/arbeidssoker-niva3-mock';
import {
    behovForVeiledningGetResolver,
    behovForVeiledningPostResolver,
    opprettDialogPostResolver,
} from './demo-state-behov-for-veiledning';
import levertMeldekortMock from '../mocks/meldeplikt-hendelser.mock';
import arbeidssokerInnholdMock from '../mocks/arbeidssoker-innhold-mock';
import arbeidssokerperioderMock from '../mocks/arbeidssokerperioder-mock';
import opplysningerOmArbeidssoker from '../mocks/opplysninger-om-arbeidssoker-mock';

export const demo_handlers = [
    msw_get(ULESTEDIALOGER_URL, {
        antallUleste: hentUlesteDialoger() ? randomUlesteDialoger() : 0,
    }),

    msw_get(MOTESTOTTE_URL, hentMotestotte()),

    http.get(BESVARELSE_URL, besvarelseGetResolver),
    //msw_get(BESVARELSE_URL, null),

    http.post(BESVARELSE_URL, besvarelsePostResolver),

    msw_get(FEATURE_URL, hentFeatureToggles()),

    msw_get(AUTH_API, hentAutentiseringsInfo()),

    msw_get(NESTE_MELDEKORT_URL, lagMeldekortData()),
    /*
    rest.get(NESTE_MELDEKORT_URL, async (req, res, ctx) => {
        return res(ctx.status(401));
    }),
    */
    msw_get(MELDEKORTSTATUS_URL, meldekortstatusResponse),
    /*
    rest.get(MELDEKORTSTATUS_URL, async (req, res, ctx) => {
        return res(ctx.status(401));
    }),
    */

    msw_get(`${DP_INNSYN_URL}/vedtak`, hentDpInnsynVedtak()),
    msw_get(`${DP_INNSYN_URL}/soknad`, hentDpInnsynSoknad()),
    msw_get(`${DP_INNSYN_URL}/paabegynte`, hentDpInnsynPaabegynte()),

    http.get(PROFIL_URL, brukerProfilGetResolver),
    http.post(PROFIL_URL, brukerProfilPostResolver),

    http.post(OPPRETT_DIALOG_URL, opprettDialogPostResolver),
    http.get(BEHOV_FOR_VEILEDNING_URL, behovForVeiledningGetResolver),
    http.post(BEHOV_FOR_VEILEDNING_URL, behovForVeiledningPostResolver),

    http.get(ARBEIDSSOKER_NIVA3_URL, async ({ request }) => {
        const url = new URL(request.url);

        // eslint-disable-next-line no-restricted-globals
        const { underOppfolging } = hentUnderOppfolging();

        await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

        return HttpResponse.json(
            arbeidssokerNiva3Response(
                underOppfolging,
                url.searchParams.get('arbeidssokerPeriode') as ArbeidssokerPeriode,
            ),
        );
    }),

    msw_get(ER_STANDARD_INNSATSGRUPPE_URL, hentStandardInnsatsgruppe().standardInnsatsgruppe),
    msw_get(ARBEIDSOKERPERIODER_URL, arbeidssokerperioderMock),
    msw_get(OPPLYSNINGER_OM_ARBEIDSSOKER_URL, opplysningerOmArbeidssoker),
    http.get(`${MELDEPLIKT_URL}/siste`, () => {
        // eslint-disable-next-line no-restricted-globals
        const valg = hentDemoState(DemoData.ARBEIDSSOKER_NESTE_PERIODE);
        const erArbeidssokerNestePeriode = valg ? valg === 'Ja' : true;

        return HttpResponse.json(levertMeldekortMock(erArbeidssokerNestePeriode));
    }),
    msw_get(DAGPENGER_STATUS, { dagpengerStatus: 'ukjent', antallDagerSidenDagpengerStanset: 'N/A' }),
    msw_get(ANTATT_INAKTIVERINGSGRUNN, { meldekortStatus: 'N/A' }),

    http.get(REAKTIVERING_URL, reaktiveringGetResolver),
    http.post(REAKTIVERING_URL, reaktiveringPostResolver),
    http.get(KAN_REAKTIVERES_URL, () => {
        return HttpResponse.json({ kanReaktiveres: true });
    }),
    http.post(FULLFOER_REAKTIVERING_URL, async () => {
        const delay = new Promise((resolve) =>
            setTimeout(() => {
                settArbeidssokerPeriode('aktiv');
                resolve(null);
            }, 1000),
        );
        await delay;
        return HttpResponse.json(null, { status: 204 });
    }),

    http.get(ARBEIDSOKER_INNHOLD, () => {
        return HttpResponse.json(arbeidssokerInnholdMock);
    }),

    http.post(OPPRETT_OPPGAVE_URL, async () => {
        return HttpResponse.json(null, { status: 201 });
    }),

    http.post('https://amplitude.nav.no/collect', () => {
        return HttpResponse.json(null, { status: 200 });
    }),

    http.post(telemetryUrl, () => {
        return HttpResponse.json(null, { status: 200 });
    }),
];
