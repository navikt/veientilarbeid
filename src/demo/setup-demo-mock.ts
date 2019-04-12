import {
    FEATURE_URL,
    JOBBSOKERBESVARELSE_URL,
    SERVICEGRUPPE_URL,
    STARTREGISTRERING_URL,
    BRUKERREGISTRERING_URL,
    VEILARBOPPFOLGING_URL,
    ULESTEDIALOGER_URL,
} from '../ducks/api'; // featureQueryParams
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { hentJsk, hentServicegruppe, hentSykmeldtMedArbeidsgiver,
    hentBrukerRegistrering, hentUlesteDialoger } from './demo-state';
import featureTogglesMock from "../mocks/feature-toggles-mock";

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
    reservasjonKRR: false
});

fetchMock.get(SERVICEGRUPPE_URL, {
    servicegruppe: hentServicegruppe()
});

fetchMock.get(STARTREGISTRERING_URL, {
    erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver()
});

fetchMock.get(BRUKERREGISTRERING_URL, hentBrukerRegistrering());

fetchMock.get(ULESTEDIALOGER_URL, {
    antallUleste: hentUlesteDialoger() ? randomUlesteDialoger() : 0
});

fetchMock.get(JOBBSOKERBESVARELSE_URL, hentJsk());

/* ????
const unleashUrl = FEATURE_URL + featureQueryParams([egenvurderingToggleKey]);
fetchMock.get(unleashUrl, {[egenvurderingToggleKey]: true});
*/

fetchMock.get(`express:${FEATURE_URL}(.*)`, featureTogglesMock);
fetchMock.get(`${FEATURE_URL}(.*)`, featureTogglesMock);