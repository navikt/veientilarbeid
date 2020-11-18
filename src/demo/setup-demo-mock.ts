import {
    JOBBSOKERBESVARELSE_URL,
    BRUKERREGISTRERING_URL,
    VEILARBOPPFOLGING_URL,
    ULESTEDIALOGER_URL,
    EGENVURDERINGBESVARELSE_URL,
    MOTESTOTTE_URL,
    BRUKERINFO_URL,
    FEATURE_URL,
} from '../ducks/api';

import {
    hentJsk,
    hentReservasjonKRR,
    hentServicegruppe,
    hentFormidlingsgruppe,
    hentSykmeldtMedArbeidsgiver,
    hentUlesteDialoger,
    hentEgenvurdering,
    hentAutentiseringsInfo,
    hentMotestotte,
    hentGeografiskTilknytning,
    hentRegistreringType,
    hentRettighetsgruppe,
    hentFeatureToggles,
} from './demo-state';

import {hentBrukerRegistreringData} from './demo-state-brukerregistrering';
import {AUTH_API} from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';
import {rest} from "msw";

function getter(endpoint: string, response: Object | null, statusCode: number = 200): any {
    return rest.get(endpoint, (req, res, ctx) => {
        return res(
            ctx.status(statusCode),
            ctx.json(response ? response : {})
        )
    })
}

const randomUlesteDialoger = () => {
    const min = 1;
    const max = 99;
    return Math.floor(min + Math.random() * (max - min));
};
export const demo_handlers = [
    getter(VEILARBOPPFOLGING_URL, {
        underOppfolging: true,
        kanReaktiveres: false,
        reservasjonKRR: hentReservasjonKRR(),
        servicegruppe: hentServicegruppe(),
        formidlingsgruppe: hentFormidlingsgruppe(),
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: '010302',
    }),

    getter(BRUKERINFO_URL, {
        erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver(),
        geografiskTilknytning: hentGeografiskTilknytning(),
        registreringType: hentRegistreringType(),
        rettighetsgruppe: hentRettighetsgruppe(),
    }),


    getter(BRUKERINFO_URL, {
        erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver(),
        geografiskTilknytning: hentGeografiskTilknytning(),
        registreringType: hentRegistreringType(),
        rettighetsgruppe: hentRettighetsgruppe(),
    }),

    getter(BRUKERREGISTRERING_URL, hentBrukerRegistreringData()),

    getter(ULESTEDIALOGER_URL, {
        antallUleste: hentUlesteDialoger() ? randomUlesteDialoger() : 0,
    }),

    getter(JOBBSOKERBESVARELSE_URL, hentJsk()),

    getter(EGENVURDERINGBESVARELSE_URL, hentEgenvurdering()),

    getter(MOTESTOTTE_URL, hentMotestotte()),

    getter(FEATURE_URL, hentFeatureToggles()),

    getter(AUTH_API, hentAutentiseringsInfo()),
]