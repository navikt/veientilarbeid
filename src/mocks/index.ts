import oppfolgingResponse from './oppfolging-mock';
import {
    FEATURE_URL, JOBBSOKERBESVARELSE_URL, SERVICEGRUPPE_URL, STARTREGISTRERING_URL, VEILARBOPPFOLGING_URL
} from '../ducks/api';
import servicegruppeResponse from './servicegruppe-mock';
import sykmeldtInfoResponse from './sykmeldt-info-mock';
import jobbsokerbesvarelseResponse from './jobbsokerbesvarelse-mock';
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';

const loggingMiddleware: Middleware = (request, response) => {
    console.log(request.url, request.method, response); // tslint:disable-line:no-console
    return response;
};

const fetchMock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(200),
        MiddlewareUtils.failurerateMiddleware(0.00),
        loggingMiddleware,
    ),
});

const MOCK_OPPFOLGING = true;
const MOCK_FEATURE_TOGGLES = true;
const MOCK_SERVICEGRUPPE = true;
const MOCK_STARTREGISTRERING = true;
const MOCK_JOBBSOKERBESVARELSE = true;

if (MOCK_OPPFOLGING) {
    fetchMock.get(`${VEILARBOPPFOLGING_URL}/oppfolging`, oppfolgingResponse);
}

if (MOCK_FEATURE_TOGGLES) {
    fetchMock.get(`express:${FEATURE_URL}(.*)`, {});
    fetchMock.get(`${FEATURE_URL}(.*)`, {});
}

if (MOCK_SERVICEGRUPPE) {
    fetchMock.get(SERVICEGRUPPE_URL, servicegruppeResponse);
}

if (MOCK_STARTREGISTRERING) {
    fetchMock.get(STARTREGISTRERING_URL, sykmeldtInfoResponse);
}

if (MOCK_JOBBSOKERBESVARELSE) {
    fetchMock.get(JOBBSOKERBESVARELSE_URL, jobbsokerbesvarelseResponse);
}
