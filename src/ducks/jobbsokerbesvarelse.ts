import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_JOBBSOKERBESVARELSE_OK = 'HENT_JOBBSOKERBESVARELSE_OK',
    HENT_JOBBSOKERBESVARELSE_PENDING = 'HENT_JOBBSOKERBESVARELSE_PENDING',
    HENT_JOBBSOKERBESVARELSE_FEILET = 'HENT_JOBBSOKERBESVARELSE_FEILET',
}

export interface State {
    data: {};
    harJobbsokerbesvarelse: boolean;
    status: string;
}

const initialState: State = {
    data: {},
    harJobbsokerbesvarelse: false,
    status: STATUS.NOT_STARTED
};

interface Action {
    type: ActionTypes;
    data: {
        raad?: {};
    };
}

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_JOBBSOKERBESVARELSE_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_JOBBSOKERBESVARELSE_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_JOBBSOKERBESVARELSE_OK: {
            return {
                ...state,
                status: STATUS.OK,
                harJobbsokerbesvarelse: action.data && action.data.raad !== undefined,
                data: action.data,
            };
        }
        default:
            return state;
    }
}

export function hentJobbsokerbesvarelse() {
    return doThenDispatch(() => Api.hentJobbsokerbesvarelse(), {
        PENDING: ActionTypes.HENT_JOBBSOKERBESVARELSE_PENDING,
        OK: ActionTypes.HENT_JOBBSOKERBESVARELSE_OK,
        FEILET: ActionTypes.HENT_JOBBSOKERBESVARELSE_FEILET,
    });
}

export function selectJobbsokerbesvarelse(state: AppState): State {
    return state.jobbsokerbesvarelse;
}