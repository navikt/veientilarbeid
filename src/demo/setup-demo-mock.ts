import { rest } from 'msw';

import {
    BRUKERINFO_URL,
    BRUKERREGISTRERING_URL,
    FEATURE_URL,
    MELDEKORTSTATUS_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    ULESTEDIALOGER_URL,
    VEILARBOPPFOLGING_URL,
    DP_INNSYN_URL,
    GJELDER_FRA_DATO_URL,
    AUTH_API,
    PROFIL_URL,
    ARBEIDSSOKER_NIVA3_URL,
    ER_STANDARD_INNSATSGRUPPE_URL,
    BEHOV_FOR_VEILEDNING_URL,
    OPPRETT_DIALOG_URL,
    MELDEPLIKT_URL,
    DAGPENGER_STATUS,
    ANTATT_INAKTIVERINGSGRUNN,
    REAKTIVERING_URL,
} from '../ducks/api';

import {
    hentAlder,
    hentAutentiseringsInfo,
    hentFeatureToggles,
    hentFormidlingsgruppe,
    hentMotestotte,
    hentRegistreringType,
    hentRettighetsgruppe,
    hentServicegruppe,
    hentSykmeldtMedArbeidsgiver,
    hentUlesteDialoger,
    hentUnderOppfolging,
    lagMeldekortData,
    randomUlesteDialoger,
    hentDpInnsynVedtak,
    hentDpInnsynSoknad,
    hentDpInnsynPaabegynte,
    hentStandardInnsatsgruppe,
    hentDemoState,
    DemoData,
} from './demo-state';

import { hentBrukerRegistrering } from './demo-state-brukerregistrering';
import msw_get from '../mocks/msw-utils';
import meldekortstatusResponse from '../mocks/meldekortstatus-mock';
import { gjelderFraGetResolver, gjelderFraPostResolver } from './demo-state-gjelderfra';
import { brukerProfilGetResolver, brukerProfilPostResolver } from './demo-state-profil';
import { reaktiveringGetResolver, reaktiveringPostResolver } from './demo-state-reaktivering';
import arbeidssokerNiva3Response, { ArbeidssokerPeriode } from '../mocks/arbeidssoker-niva3-mock';
import {
    behovForVeiledningGetResolver,
    behovForVeiledningPostResolver,
    opprettDialogPostResolver,
} from './demo-state-behov-for-veiledning';
import levertMeldekortMock from '../mocks/meldeplikt-hendelser.mock';

export const demo_handlers = [
    msw_get(VEILARBOPPFOLGING_URL, {
        underOppfolging: true,
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: hentServicegruppe(),
        formidlingsgruppe: hentFormidlingsgruppe(),
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: '010302',
    }),

    /**
     *    const geografiskeTilknytninger = {
        '3808': 'Notodden',
        '010302': 'Grünerløkka',
        '110302': 'Tasta',
        '3422': 'Åmot',
    };
     */
    msw_get(BRUKERINFO_URL, {
        erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver(),
        geografiskTilknytning: '3808',
        registreringType: hentRegistreringType(),
        rettighetsgruppe: hentRettighetsgruppe(),
        alder: hentAlder(),
    }),

    // msw_get(BRUKERREGISTRERING_URL, hentBrukerRegistrering()),

    msw_get(ULESTEDIALOGER_URL, {
        antallUleste: hentUlesteDialoger() ? randomUlesteDialoger() : 0,
    }),

    msw_get(MOTESTOTTE_URL, hentMotestotte()),

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

    rest.get(GJELDER_FRA_DATO_URL, gjelderFraGetResolver),
    rest.post(GJELDER_FRA_DATO_URL, gjelderFraPostResolver),

    rest.get(PROFIL_URL, brukerProfilGetResolver),
    rest.post(PROFIL_URL, brukerProfilPostResolver),

    rest.post(OPPRETT_DIALOG_URL, opprettDialogPostResolver),
    rest.get(BEHOV_FOR_VEILEDNING_URL, behovForVeiledningGetResolver),
    rest.post(BEHOV_FOR_VEILEDNING_URL, behovForVeiledningPostResolver),

    rest.get(ARBEIDSSOKER_NIVA3_URL, (req, res, ctx) => {
        // eslint-disable-next-line no-restricted-globals
        const searchParams = new URLSearchParams(location.search);
        const { underOppfolging } = hentUnderOppfolging();

        return res(
            ctx.json(
                arbeidssokerNiva3Response(
                    underOppfolging,
                    searchParams.get('arbeidssokerPeriode') as ArbeidssokerPeriode
                )
            )
        );
    }),

    rest.get(BRUKERREGISTRERING_URL, (req, res, ctx) => {
        // eslint-disable-next-line no-restricted-globals
        const searchParams = new URLSearchParams(location.search);
        const erRegistrertLegacy = searchParams.get('arbeidssokerPeriode') === 'aktiv-legacy';

        if (erRegistrertLegacy) {
            return res(ctx.json({ registrering: null }));
        }

        return res(ctx.json(hentBrukerRegistrering()));
    }),

    msw_get(ER_STANDARD_INNSATSGRUPPE_URL, hentStandardInnsatsgruppe().standardInnsatsgruppe),
    rest.get(`${MELDEPLIKT_URL}/siste`, (req, res, ctx) => {
        // eslint-disable-next-line no-restricted-globals
        const valg = hentDemoState(DemoData.ARBEIDSSOKER_NESTE_PERIODE);
        const erArbeidssokerNestePeriode = valg ? valg === 'Ja' : true;

        return res(ctx.json(levertMeldekortMock(erArbeidssokerNestePeriode)));
    }),
    msw_get(DAGPENGER_STATUS, { dagpengerStatus: 'ukjent', antallDagerSidenDagpengerStanset: 'N/A' }),
    msw_get(ANTATT_INAKTIVERINGSGRUNN, { meldekortStatus: 'N/A' }),

    rest.get(REAKTIVERING_URL, reaktiveringGetResolver),
    rest.post(REAKTIVERING_URL, reaktiveringPostResolver),

    rest.post('https://amplitude.nav.no/collect', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
