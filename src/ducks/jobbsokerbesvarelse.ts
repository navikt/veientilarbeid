import {
    ActionType, Handling, HentJobbsokerbesvarelseFEILETAction, HentJobbsokerbesvarelseOKAction,
    HentJobbsokerbesvarelsePENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { hentJobbsokerbesvarelseFetch, DataElement, STATUS } from './api';
import { doThenDispatch } from './api-utils';

export interface State extends DataElement {
    data: {
        raad?: [];
    };
    harJobbsokerbesvarelse: boolean;
}

const initialState: State = {
    data: {
        raad: undefined
    },
    harJobbsokerbesvarelse: false,
    status: STATUS.NOT_STARTED
};

export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_JOBBSOKERBESVARELSE_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_JOBBSOKERBESVARELSE_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENT_JOBBSOKERBESVARELSE_OK: {
            return {
                ...state,
                status: STATUS.OK,
                harJobbsokerbesvarelse: action.data.data && action.data.data.raad !== undefined,
                data: action.data.data,
            };
        }
        default:
            return state;
    }
}

export function hentJobbsokerbesvarelse(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<State>(() => hentJobbsokerbesvarelseFetch(), {
        ok: hentJobbsokerbesvarelseOk,
        feilet: hentJobbsokerbesvarelseFeilet,
        pending: hentJobbsokerbesvarelsePending,
    });
}

function hentJobbsokerbesvarelseOk(jobbsokerbesvarelse: State): HentJobbsokerbesvarelseOKAction {
    return {
        type: ActionType.HENT_JOBBSOKERBESVARELSE_OK,
        data: jobbsokerbesvarelse
    };
}

function hentJobbsokerbesvarelseFeilet(): HentJobbsokerbesvarelseFEILETAction {
    return {
        type: ActionType.HENT_JOBBSOKERBESVARELSE_FEILET,
    };
}

function hentJobbsokerbesvarelsePending(): HentJobbsokerbesvarelsePENDINGAction {
    return {
        type: ActionType.HENT_JOBBSOKERBESVARELSE_PENDING,
    };
}
