import {
    ActionType,
    Handling,
    HentUlesteDialogerFEILETAction,
    HentUlesteDialogerOKAction,
    HentUlesteDialogerPENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { hentUlesteDialogerFetch, DataElement, STATUS } from './api';
import { doThenDispatch } from './api-utils';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    antallUleste: number;
}

const initialState: State = {
    data: {
        antallUleste: 0,
    },
    status: STATUS.NOT_STARTED,
};

//  Reducer
export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_ULESTE_DIALOGER_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionType.HENT_ULESTE_DIALOGER_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionType.HENT_ULESTE_DIALOGER_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentUlesteDialoger(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<Data>(() => hentUlesteDialogerFetch(), {
        ok: hentUlesteDialogerOK,
        feilet: hentUlesteDialogerFeilet,
        pending: hentUlesteDialogerPending,
    });
}

function hentUlesteDialogerOK(data: Data): HentUlesteDialogerOKAction {
    return {
        type: ActionType.HENT_ULESTE_DIALOGER_OK,
        data: data,
    };
}

function hentUlesteDialogerFeilet(): HentUlesteDialogerFEILETAction {
    return {
        type: ActionType.HENT_ULESTE_DIALOGER_FEILET,
    };
}

function hentUlesteDialogerPending(): HentUlesteDialogerPENDINGAction {
    return {
        type: ActionType.HENT_ULESTE_DIALOGER_PENDING,
    };
}
