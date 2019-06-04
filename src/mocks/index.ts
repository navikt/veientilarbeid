import oppfolgingResponse from './oppfolging-mock';
import {
    FEATURE_URL, JOBBSOKERBESVARELSE_URL, INNSATSGRUPPE_URL, STARTREGISTRERING_URL, VEILARBOPPFOLGING_URL,
    ULESTEDIALOGER_URL, BRUKERREGISTRERING_URL, EGENVURDERINGBESVARELSE_URL, MOTESTOTTE_URL
} from '../ducks/api';
import innsatsgruppeResponse from './innsatsgruppe-mock';
import sykmeldtInfoResponse from './sykmeldt-info-mock';
import jobbsokerbesvarelseResponse from './jobbsokerbesvarelse-mock';
import ulesteDialogerResponse from './ulestedialoger-mock';
import brukerRegistreringResponse from './brukerregistrering-mock';
import egenvurderingbesvarelseResponse from './egenvurderingbesvarelse-mock';
import authResponse from './auth-mock';

import FetchMock, { Middleware, MiddlewareUtils, ResponseUtils } from 'yet-another-fetch-mock';
import { AUTH_API } from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';

const loggingMiddleware: Middleware = (request, response) => {
    console.log(request.url, request.method, response); // tslint:disable-line:no-console
    return response;
};

const fetchMock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(200),
        MiddlewareUtils.failurerateMiddleware(0.01),
        loggingMiddleware,
    ),
});

fetchMock.get(VEILARBOPPFOLGING_URL, oppfolgingResponse);

fetchMock.get(`${FEATURE_URL}(.*)`, {});

fetchMock.get(INNSATSGRUPPE_URL, innsatsgruppeResponse);

fetchMock.get(STARTREGISTRERING_URL, sykmeldtInfoResponse);

fetchMock.get(JOBBSOKERBESVARELSE_URL, jobbsokerbesvarelseResponse);

fetchMock.get(ULESTEDIALOGER_URL, ulesteDialogerResponse);

fetchMock.get(BRUKERREGISTRERING_URL, brukerRegistreringResponse);
// fetchMock.get(EGENVURDERINGBESVARELSE_URL, ResponseUtils.statusCode(204));

fetchMock.get(EGENVURDERINGBESVARELSE_URL, egenvurderingbesvarelseResponse);
// fetchMock.get(EGENVURDERINGBESVARELSE_URL, ResponseUtils.statusCode(204));
fetchMock.get(MOTESTOTTE_URL, ResponseUtils.statusCode(204));

fetchMock.get(AUTH_API, authResponse);
