import {
    BRUKERINFO_URL,
    BRUKERREGISTRERING_URL,
    EGENVURDERINGBESVARELSE_URL,
    FEATURE_URL,
    JOBBSOKERBESVARELSE_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    ULESTEDIALOGER_URL,
    UNDER_OPPFOLGING_URL,
    VEILARBOPPFOLGING_URL,
} from '../ducks/api';

import {
    hentAutentiseringsInfo,
    hentEgenvurdering,
    hentFeatureToggles,
    hentFormidlingsgruppe,
    hentGeografiskTilknytning,
    hentJsk,
    hentKanReaktiveres,
    hentMeldekort,
    hentMotestotte,
    hentRegistreringType,
    hentReservasjonKRR,
    hentRettighetsgruppe,
    hentServicegruppe,
    hentSykmeldtMedArbeidsgiver,
    hentUlesteDialoger,
    hentUnderOppfolging,
} from './demo-state';

import { hentBrukerRegistreringData } from './demo-state-brukerregistrering';
import { AUTH_API } from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';
import msw_get from '../mocks/msw-utils';
import { plussDager } from '../utils/date-utils';

const randomUlesteDialoger = () => {
    const min = 1;
    const max = 99;
    return Math.floor(min + Math.random() * (max - min));
};

const iDag = new Date();

function lagMeldekortData(antallDagerEtterFastsattMeldedag: number) {
    return {
        maalformkode: 'NO',
        meldeform: 'EMELD',
        meldekort: [
            {
                meldekortId: 1526772064,
                kortType: 'ELEKTRONISK',
                meldeperiode: {
                    fra: plussDager(iDag, -(14 + antallDagerEtterFastsattMeldedag)).toISOString(),
                    til: plussDager(iDag, -(1 + antallDagerEtterFastsattMeldedag)).toISOString(),
                    kortKanSendesFra: plussDager(iDag, -(2 + antallDagerEtterFastsattMeldedag)).toISOString(),
                    kanKortSendes: false,
                    periodeKode: '202103',
                },
                meldegruppe: 'ARBS',
                kortStatus: 'OPPRE',
                bruttoBelop: 0.0,
                erForskuddsPeriode: false,
                korrigerbart: true,
            },
        ],
        etterregistrerteMeldekort: [],
        id: '1',
        antallGjenstaaendeFeriedager: 0,
    };
}

export const demo_handlers = [
    msw_get(VEILARBOPPFOLGING_URL, {
        underOppfolging: true,
        kanReaktiveres: hentKanReaktiveres(),
        reservasjonKRR: hentReservasjonKRR(),
        servicegruppe: hentServicegruppe(),
        formidlingsgruppe: hentFormidlingsgruppe(),
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: '010302',
    }),

    msw_get(BRUKERINFO_URL, {
        erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver(),
        geografiskTilknytning: hentGeografiskTilknytning(),
        registreringType: hentRegistreringType(),
        rettighetsgruppe: hentRettighetsgruppe(),
    }),

    msw_get(BRUKERINFO_URL, {
        erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver(),
        geografiskTilknytning: hentGeografiskTilknytning(),
        registreringType: hentRegistreringType(),
        rettighetsgruppe: hentRettighetsgruppe(),
    }),

    msw_get(BRUKERREGISTRERING_URL, hentBrukerRegistreringData()),

    msw_get(ULESTEDIALOGER_URL, {
        antallUleste: hentUlesteDialoger() ? randomUlesteDialoger() : 0,
    }),

    msw_get(JOBBSOKERBESVARELSE_URL, hentJsk()),

    msw_get(EGENVURDERINGBESVARELSE_URL, hentEgenvurdering()),

    msw_get(MOTESTOTTE_URL, hentMotestotte()),

    msw_get(FEATURE_URL, hentFeatureToggles()),

    msw_get(AUTH_API, hentAutentiseringsInfo()),

    msw_get(UNDER_OPPFOLGING_URL, hentUnderOppfolging()),

    msw_get(NESTE_MELDEKORT_URL, lagMeldekortData(hentMeldekort())),
];
