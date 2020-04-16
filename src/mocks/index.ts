import oppfolgingResponse from './oppfolging-mock';
import {
    BRUKERINFO_URL, JOBBSOKERBESVARELSE_URL, VEILARBOPPFOLGING_URL,
    ULESTEDIALOGER_URL, BRUKERREGISTRERING_URL, EGENVURDERINGBESVARELSE_URL, MOTESTOTTE_URL,
    FEATURE_URL, SITUASJON_URL
} from '../ducks/api';
import brukerInfoResponse from './bruker-info-mock';
import jobbsokerbesvarelseResponse from './jobbsokerbesvarelse-mock';
import ulesteDialogerResponse from './ulestedialoger-mock';
import egenvurderingbesvarelseResponse from './egenvurderingbesvarelse-mock';
import brukerRegistreringResponse from  './brukerregistrering-mock';
import authResponse from './auth-mock';
import featureTogglesResponse from './feature-toggles-mock';
import motestotteResponse from './motestotte-mock';
import situasjonResponse from './situasjon-mock'

import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
// import FetchMock, { Middleware, MiddlewareUtils, ResponseUtils } from 'yet-another-fetch-mock';
import { AUTH_API } from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';

const loggingMiddleware: Middleware = (request, response) => {
    console.log(request.url, request.method, response);
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

fetchMock.get(BRUKERINFO_URL, brukerInfoResponse);

fetchMock.get(JOBBSOKERBESVARELSE_URL, jobbsokerbesvarelseResponse);
// fetchMock.get(JOBBSOKERBESVARELSE_URL, ResponseUtils.statusCode(404));

fetchMock.get(ULESTEDIALOGER_URL, ulesteDialogerResponse);
// fetchMock.get(ULESTEDIALOGER_URL, ResponseUtils.statusCode(404));

fetchMock.get(BRUKERREGISTRERING_URL, brukerRegistreringResponse);
// fetchMock.get(BRUKERREGISTRERING_URL, ResponseUtils.statusCode(404));

fetchMock.get(EGENVURDERINGBESVARELSE_URL, egenvurderingbesvarelseResponse);
// fetchMock.get(EGENVURDERINGBESVARELSE_URL, ResponseUtils.statusCode(204));
// fetchMock.get(EGENVURDERINGBESVARELSE_URL, ResponseUtils.statusCode(404));

fetchMock.get(FEATURE_URL, featureTogglesResponse);

fetchMock.get(MOTESTOTTE_URL, motestotteResponse);
// fetchMock.get(MOTESTOTTE_URL, ResponseUtils.statusCode(204));

fetchMock.get(SITUASJON_URL, situasjonResponse);
//fetchMock.get(SITUASJON_URL, ResponseUtils.statusCode(204));


fetchMock.get(AUTH_API, authResponse);
