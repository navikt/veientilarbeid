import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_INNLOGGINGSINFO_OK = 'HENT_INNLOGGINGSINFO_OK',
    HENT_INNLOGGINGSINFO_PENDING = 'HENT_INNLOGGINGSINFO_PENDING',
    HENT_INNLOGGINGSINFO_FEILET = 'HENT_INNLOGGINGSINFO_FEILET'
}

export interface State {
    data: Data;
    status: string;
}

export interface Data {
    authenticated?: boolean;
    name?: string;
    securityLevel?: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    data: {},
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_INNLOGGINGSINFO_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_INNLOGGINGSINFO_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_INNLOGGINGSINFO_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentInnloggingsInfo() {
    return doThenDispatch(() => Api.hentInnloggingsInfo(), {
        PENDING: ActionTypes.HENT_INNLOGGINGSINFO_PENDING,
        OK: ActionTypes.HENT_INNLOGGINGSINFO_OK,
        FEILET: ActionTypes.HENT_INNLOGGINGSINFO_FEILET,
    });
}

export function selectInnloggingsinfo(state: AppState): State {
    return state.innloggingsInfo;
}