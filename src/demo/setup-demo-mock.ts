import {
    JOBBSOKERBESVARELSE_URL,
    STARTREGISTRERING_URL,
    BRUKERREGISTRERING_URL,
    VEILARBOPPFOLGING_URL,
    ULESTEDIALOGER_URL,
    EGENVURDERINGBESVARELSE_URL,
    MOTESTOTTE_URL
} from '../ducks/api';
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import {
    hentJsk, hentReservasjonKRR,
    hentServicegruppe,
    hentSykmeldtMedArbeidsgiver,
    hentUlesteDialoger, hentEgenvurdering, hentAutentiseringsInfo, hentMotestotte
} from './demo-state';
import { hentBrukerRegistreringData } from './demo-state-brukerregistrering';
import { AUTH_API } from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';

const loggingMiddleware: Middleware = (request, response) => {
    console.log(request.url, request.method, response); // tslint:disable-line:no-console
    return response;
};

const fetchMock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(200),
        MiddlewareUtils.failurerateMiddleware(0.00),
        loggingMiddleware,
    ),
});

const randomUlesteDialoger = () => {
    const min = 1;
    const max = 99;
    return Math.floor(min + (Math.random() * (max - min)));
};

fetchMock.get(VEILARBOPPFOLGING_URL, {
    underOppfolging: true,
    kanReaktiveres: false,
    reservasjonKRR: hentReservasjonKRR(),
    servicegruppe: hentServicegruppe(),
});

fetchMock.get(STARTREGISTRERING_URL, {
    erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver()
});

fetchMock.get(BRUKERREGISTRERING_URL, hentBrukerRegistreringData());

fetchMock.get(ULESTEDIALOGER_URL, {
    antallUleste: hentUlesteDialoger() ? randomUlesteDialoger() : 0
});

fetchMock.get(JOBBSOKERBESVARELSE_URL, hentJsk());

fetchMock.get(EGENVURDERINGBESVARELSE_URL, hentEgenvurdering());

fetchMock.get(MOTESTOTTE_URL, hentMotestotte());

fetchMock.get(AUTH_API, hentAutentiseringsInfo());
