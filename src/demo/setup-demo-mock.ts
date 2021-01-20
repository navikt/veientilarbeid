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
    hentMotestotte,
    hentRegistreringType,
    hentReservasjonKRR,
    hentRettighetsgruppe,
    hentServicegruppe,
    hentSykmeldtMedArbeidsgiver,
    hentUlesteDialoger,
    hentUnderOppfolging,
} from './demo-state';

import {hentBrukerRegistreringData} from './demo-state-brukerregistrering';
import {AUTH_API} from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';
import msw_get from '../mocks/msw-utils';

const randomUlesteDialoger = () => {
    const min = 1;
    const max = 99;
    return Math.floor(min + Math.random() * (max - min));
};
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

    msw_get(NESTE_MELDEKORT_URL, {
            "maalformkode": "NO",
            "meldeform": "EMELD",
            "meldekort": [
                {
                    "meldekortId": 1526772064,
                    "kortType": "ELEKTRONISK",
                    "meldeperiode": {
                        "fra": "2021-01-18T12:00:00+01:00",
                        "til": "2021-01-31T12:00:00+01:00",
                        "kortKanSendesFra": "2021-01-30T12:00:00+01:00",
                        "kanKortSendes": false,
                        "periodeKode": "202103"
                    },
                    "meldegruppe": "ARBS",
                    "kortStatus": "OPPRE",
                    "bruttoBelop": 0.0,
                    "erForskuddsPeriode": false,
                    "korrigerbart": true
                }
            ],
            "etterregistrerteMeldekort": [],
            "id": "1",
            "antallGjenstaaendeFeriedager": 0
        }
    )
];
