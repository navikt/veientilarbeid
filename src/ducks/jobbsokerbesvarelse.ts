import {
    ActionType, Handling, HentJobbsokerbesvarelseFEILETAction, HentJobbsokerbesvarelseOKAction,
    HentJobbsokerbesvarelsePENDINGAction, SettJobbsokerbesvarelseOKAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { hentJobbsokerbesvarelseFetch, DataElement, STATUS } from './api';
import { doThenDispatch } from './api-utils';

export interface State extends DataElement {
    data: Data;
    harJobbsokerbesvarelse: boolean;
}

const initialState: State = {
    data: {},
    harJobbsokerbesvarelse: false,
    status: STATUS.NOT_STARTED
};

export interface Data {
    raad?: [];
}

export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_JOBBSOKERBESVARELSE_OK: {
            return {
                ...state,
                status: STATUS.OK,
                harJobbsokerbesvarelse: action.data && !!action.data.raad,
                data: action.data,
            };
        }
        case ActionType.HENT_JOBBSOKERBESVARELSE_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_JOBBSOKERBESVARELSE_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.SETT_JOBBSOKERBESVARELSE_OK:
            return {...state, status: STATUS.OK};
        default:
            return state;
    }
}

export function hentJobbsokerbesvarelse(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<Data>(() => hentJobbsokerbesvarelseFetch(), {
        ok: hentJobbsokerbesvarelseOk,
        feilet: hentJobbsokerbesvarelseFeilet,
        pending: hentJobbsokerbesvarelsePending,
    });
}

function hentJobbsokerbesvarelseOk(jobbsokerbesvarelseData: Data): HentJobbsokerbesvarelseOKAction {
    return {
        type: ActionType.HENT_JOBBSOKERBESVARELSE_OK,
        data: jobbsokerbesvarelseData
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

export function settJobbsokerbesvarelseOK(): SettJobbsokerbesvarelseOKAction {
    return {
        type: ActionType.SETT_JOBBSOKERBESVARELSE_OK
    };
}
