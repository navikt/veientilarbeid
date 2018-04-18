import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_TEKSTER_OK = 'HENT_TEKSTER_OK',
    HENT_TEKSTER_PENDING = 'HENT_TEKSTER_PENDING',
    HENT_TEKSTER_FEILET = 'HENT_TEKSTER_FEILET'
}

export interface State {
    data: any; // tslint:disable-line no-any
    status: string;
}

interface Action {
    type: ActionTypes;
    data: any; // tslint:disable-line no-any
}

const initialState = {
    data: {},
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_TEKSTER_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_TEKSTER_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_TEKSTER_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentTekster() {
    return doThenDispatch(() => Api.hentTekster(), {
        PENDING: ActionTypes.HENT_TEKSTER_PENDING,
        OK: ActionTypes.HENT_TEKSTER_OK,
        FEILET: ActionTypes.HENT_TEKSTER_FEILET,
    });
}

export function selectTekster(state: AppState): State {
    return state.tekster;
}