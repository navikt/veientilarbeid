import {
    ActionType,
    Handling,
    HentBrukerRegistreringFEILETAction,
    HentBrukerRegistreringOKAction,
    HentBrukerRegistreringPENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { hentBrukerRegistreringFetch, DataElement, STATUS } from './api';
import { doThenDispatch } from './api-utils';
import { AppState } from '../reducer';

export enum FremtidigSituasjonSvar {
    SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
    NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
    USIKKER = 'USIKKER',
    INGEN_PASSER = 'INGEN_PASSER',
}

export interface Besvarelse {
    fremtidigSituasjon: FremtidigSituasjonSvar;
}

export enum ForeslattInnsatsgruppe {
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    BEHOV_FOR_ARBEIDSEVNEVURDERING = 'BEHOV_FOR_ARBEIDSEVNEVURDERING',
}

export interface Profilering {
    innsatsgruppe: ForeslattInnsatsgruppe;
}

interface Brukerregistrering {
    besvarelse: Besvarelse;
    profilering: Profilering;
}

export interface Data {
    registrering: Brukerregistrering;
}

export interface State extends DataElement {
    data: Data;
}

const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        registrering: {
            besvarelse: {
                fremtidigSituasjon: FremtidigSituasjonSvar.USIKKER
            },
            profilering: {
                innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS
            }
        }
    }
};

export default function reducer(state: State = initialState, action: Handling): State {

    switch (action.type) {
        case ActionType.HENT_BRUKER_REGISTRERING_PENDING:
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_BRUKER_REGISTRERING_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENT_BRUKER_REGISTRERING_OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

export function hentBrukerRegistrering(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<Data>(() => hentBrukerRegistreringFetch(), {
        ok: hentBrukerRegistreringOK,
        feilet: hentBrukerRegistreringFeilet,
        pending: hentBrukerRegistreringPending,
    });
}

function hentBrukerRegistreringOK(brukerRegistrering: Data): HentBrukerRegistreringOKAction {
    return {
        type: ActionType.HENT_BRUKER_REGISTRERING_OK,
        data: brukerRegistrering
    };
}

function hentBrukerRegistreringFeilet(): HentBrukerRegistreringFEILETAction {
    return {
        type: ActionType.HENT_BRUKER_REGISTRERING_FEILET,
    };
}

function hentBrukerRegistreringPending(): HentBrukerRegistreringPENDINGAction {
    return {
        type: ActionType.HENT_BRUKER_REGISTRERING_PENDING,
    };
}

export function selectFremtidigSituasjonSvar(state: AppState): FremtidigSituasjonSvar {
    let data = state.brukerRegistrering.data;
    if (data === null) {
        data = initialState.data;
    }
    return data.registrering.besvarelse.fremtidigSituasjon;
}
