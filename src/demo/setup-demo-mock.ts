import { rest } from 'msw';

import {
    ANTATT_INAKTIVERINGSGRUNN,
    ARBEIDSSOKER_NIVA3_URL,
    AUTH_API,
    BEHOV_FOR_VEILEDNING_URL,
    BESVARELSE_URL,
    BRUKERINFO_URL,
    BRUKERREGISTRERING_URL,
    DAGPENGER_STATUS,
    DP_INNSYN_URL,
    ER_STANDARD_INNSATSGRUPPE_URL,
    FEATURE_URL,
    FULLFOER_REAKTIVERING_URL,
    GJELDER_FRA_DATO_URL,
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
    VEILARBOPPFOLGING_URL,
} from '../ducks/api';

import {
    DemoData,
    hentAlder,
    hentAutentiseringsInfo,
    hentDemoState,
    hentDpInnsynPaabegynte,
    hentDpInnsynSoknad,
    hentDpInnsynVedtak,
    hentFeatureToggles,
    hentFormidlingsgruppe,
    hentMotestotte,
    hentRegistreringType,
    hentRettighetsgruppe,
    hentServicegruppe,
    hentStandardInnsatsgruppe,
    hentSykmeldtMedArbeidsgiver,
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
import { hentBrukerRegistrering } from './demo-state-brukerregistrering';

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

    rest.get(BESVARELSE_URL, besvarelseGetResolver),
    //msw_get(BESVARELSE_URL, null),

    rest.post(BESVARELSE_URL, besvarelsePostResolver),

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
                    searchParams.get('arbeidssokerPeriode') as ArbeidssokerPeriode,
                ),
            ),
        );
    }),

    rest.get(BRUKERREGISTRERING_URL, (req, res, ctx) => {
        // eslint-disable-next-line no-restricted-globals
        const searchParams = new URLSearchParams(location.search);
        const erRegistrertLegacy = searchParams.get('arbeidssokerPeriode') === 'aktiv-legacy';
        const manglerRegistrering = searchParams.get('manglerRegistrering') === 'true';

        if (erRegistrertLegacy || manglerRegistrering) {
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
    rest.get(KAN_REAKTIVERES_URL, (_req, res, ctx) => {
        return res(ctx.json({ kanReaktiveres: true }));
    }),
    rest.post(FULLFOER_REAKTIVERING_URL, async (_req, res, ctx) => {
        const delay = new Promise((resolve) =>
            setTimeout(() => {
                settArbeidssokerPeriode('aktiv');
                resolve(null);
            }, 1000),
        );
        await delay;
        return res(ctx.status(204));
    }),

    rest.post(OPPRETT_OPPGAVE_URL, async (_req, res, ctx) => {
        return res(ctx.status(201));
    }),

    rest.post('https://amplitude.nav.no/collect', (req, res, ctx) => {
        return res(ctx.status(200));
    }),

    rest.post(telemetryUrl, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
