import {
    ActionType,
    Handling,
    HentMotestottebesvarelseFEILETAction,
    HentMotestottebesvarelseOKAction, HentMotestottebesvarelsePENDINGAction,
} from './actions';
import {Dispatch} from '../dispatch-type';
import {DataElement, STATUS, hentMotestottebesvarelseFetch} from './api';
import {doThenDispatch} from './api-utils';

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
        case ActionType.HENT_MOTESTOTTEBESVARELSE_OK: {
            return {
                status: STATUS.OK,
                data: action.data,
            };
        }
        case ActionType.HENT_MOTESTOTTEBESVARELSE_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_MOTESTOTTEBESVARELSE_FEILET:
            return {...state, status: STATUS.ERROR};
        default:
            return state;
    }
}

export function hentMotestottebesvarelse(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<Data>(() => hentMotestottebesvarelseFetch(), {
        ok: hentMotestottebesvarelseOk,
        feilet: hentMotestottebesvarelseFeilet,
        pending: hentMotestottebesvarelsePending,
    });
}

function hentMotestottebesvarelseOk(egenvurderingbesvarelseData: Data): HentMotestottebesvarelseOKAction {
    return {
        type: ActionType.HENT_MOTESTOTTEBESVARELSE_OK,
        data: egenvurderingbesvarelseData
    };
}

function hentMotestottebesvarelseFeilet(): HentMotestottebesvarelseFEILETAction {
    return {
        type: ActionType.HENT_MOTESTOTTEBESVARELSE_FEILET,
    };
}

function hentMotestottebesvarelsePending(): HentMotestottebesvarelsePENDINGAction {
    return {
        type: ActionType.HENT_MOTESTOTTEBESVARELSE_PENDING,
    };
}