import {rest} from 'msw'
import {AUTH_API} from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';
import {
    BRUKERREGISTRERING_URL,
    EGENVURDERINGBESVARELSE_URL,
    MOTESTOTTE_URL,
    FEATURE_URL, ULESTEDIALOGER_URL, JOBBSOKERBESVARELSE_URL, BRUKERINFO_URL, VEILARBOPPFOLGING_URL,
} from '../ducks/api';
import AuthResponse from './auth-mock'
import ulesteDialogerResponse from './ulestedialoger-mock';
import egenvurderingbesvarelseResponse from './egenvurderingbesvarelse-mock';
import brukerRegistreringResponse from './brukerregistrering-mock';
import motestotteResponse from './motestotte-mock';
import featureTogglesResponse from './feature-toggles-mock';
import jobbsokerbesvarelseResponse from "./jobbsokerbesvarelse-mock";
import brukerInfoResponse from "./bruker-info-mock";
import oppfolgingResponse from "./oppfolging-mock";


function getter(endpoint: string, response: Object, statusCode: number = 200): any {
    return rest.get(endpoint, (req, res, ctx) => {
        return res(
            ctx.status(statusCode),
            ctx.json(response)
        )
    })
}


export const handlers = [
    getter(AUTH_API, AuthResponse),
    getter(MOTESTOTTE_URL, motestotteResponse, 204),
    getter(FEATURE_URL, featureTogglesResponse),
    getter(EGENVURDERINGBESVARELSE_URL, egenvurderingbesvarelseResponse),
    getter(BRUKERREGISTRERING_URL, brukerRegistreringResponse),
    getter(ULESTEDIALOGER_URL, ulesteDialogerResponse),
    getter(JOBBSOKERBESVARELSE_URL, jobbsokerbesvarelseResponse),
    getter(BRUKERINFO_URL, brukerInfoResponse),
    getter(VEILARBOPPFOLGING_URL, oppfolgingResponse),
]