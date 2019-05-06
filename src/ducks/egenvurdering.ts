import {
    ActionType, Handling, HentEgenvurderingbesvarelseFEILETAction, HentEgenvurderingbesvarelseOKAction, HentEgenvurderingbesvarelsePENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { hentEgenvurderingbesvarelseFetch, DataElement, STATUS } from './api';
import { doThenDispatch } from './api-utils';

export interface Data {
    sistOppdatert: string;
}

export interface State extends DataElement {
    data: Data | null;
}

const initialState: State = {
    data: null,
    status: STATUS.NOT_STARTED
};

export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_EGENVURDERINGBESVARELSE_OK: {
            return {
                status: STATUS.OK,
                data: action.data,
            };
        }
        case ActionType.HENT_EGENVURDERINGBESVARELSE_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_EGENVURDERINGBESVARELSE_FEILET:
            return {...state, status: STATUS.ERROR};
        default:
            return state;
    }
}

export function hentEgenvurderingbesvarelse(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<Data>(() => hentEgenvurderingbesvarelseFetch(), {
        ok: hentEgenvurderingbesvarelseOk,
        feilet: hentEgenvurderingbesvarelseFeilet,
        pending: hentEgenvurderingbesvarelsePending,
    });
}

function hentEgenvurderingbesvarelseOk(egenvurderingbesvarelseData: Data): HentEgenvurderingbesvarelseOKAction {
    return {
        type: ActionType.HENT_EGENVURDERINGBESVARELSE_OK,
        data: egenvurderingbesvarelseData
    };
}

function hentEgenvurderingbesvarelseFeilet(): HentEgenvurderingbesvarelseFEILETAction {
    return {
        type: ActionType.HENT_EGENVURDERINGBESVARELSE_FEILET,
    };
}

function hentEgenvurderingbesvarelsePending(): HentEgenvurderingbesvarelsePENDINGAction {
    return {
        type: ActionType.HENT_EGENVURDERINGBESVARELSE_PENDING,
    };
}