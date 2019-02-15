import {
    FEATURE_URL, JOBBSOKERBESVARELSE_URL, SERVICEGRUPPE_URL, STARTREGISTRERING_URL, VEILARBOPPFOLGING_URL
} from '../ducks/api';
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { jobbsokerbesvarelseToggleKey, servicekodeToggleKey } from '../ducks/feature-toggles';
import { hentJsk, hentServicegruppe, hentSykmeldtMedArbeidsgiver } from './demo-state';

const loggingMiddleware: Middleware = (request, response) => {
    console.log(request.url, request.method, response); // tslint:disable-line:no-console
    return response;
};

const fetchMock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(200),
        MiddlewareUtils.failurerateMiddleware(0.02),
        loggingMiddleware,
    ),
});

fetchMock.get(`${VEILARBOPPFOLGING_URL}/oppfolging`, {
    underOppfolging: true,
    kanReaktiveres: true,
});

fetchMock.get(`express:${FEATURE_URL}(.*)`, {
    [servicekodeToggleKey]: true,
    [jobbsokerbesvarelseToggleKey]: true,
});
fetchMock.get(`${FEATURE_URL}(.*)`, {
    [servicekodeToggleKey]: true,
    [jobbsokerbesvarelseToggleKey]: true,
});

fetchMock.get(SERVICEGRUPPE_URL, {
    servicegruppe: hentServicegruppe()
});

fetchMock.get(STARTREGISTRERING_URL, {
    erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver()
});

fetchMock.get(JOBBSOKERBESVARELSE_URL, hentJsk());
