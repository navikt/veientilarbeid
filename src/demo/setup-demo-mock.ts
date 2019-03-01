import {
    FEATURE_URL,
    JOBBSOKERBESVARELSE_URL,
    SERVICEGRUPPE_URL,
    STARTREGISTRERING_URL,
    VEILARBOPPFOLGING_URL,
    ULESTEDIALOGER_URL
} from '../ducks/api';
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { hentJsk, hentServicegruppe, hentSykmeldtMedArbeidsgiver, hentUlesteDialoger } from './demo-state';

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

fetchMock.get(`${VEILARBOPPFOLGING_URL}/oppfolging`, {
    underOppfolging: true,
    kanReaktiveres: false,
});

fetchMock.get(SERVICEGRUPPE_URL, {
    servicegruppe: hentServicegruppe()
});

fetchMock.get(STARTREGISTRERING_URL, {
    erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver()
});

fetchMock.get(ULESTEDIALOGER_URL, {
    antallUlesteDialoger: hentUlesteDialoger() ? randomUlesteDialoger() : 0
});

fetchMock.get(JOBBSOKERBESVARELSE_URL, hentJsk());

// For kjøring av demo lokalt
if (process.env.REACT_APP_MOCK) {
    fetchMock.get(`express:${FEATURE_URL}(.*)`, {});
    fetchMock.get(`${FEATURE_URL}(.*)`, {});
}
