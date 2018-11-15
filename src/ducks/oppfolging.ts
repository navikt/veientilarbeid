import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_OPPFOLGING_OK = 'HENT_OPPFOLGING_OK',
    HENT_OPPFOLGING_PENDING = 'HENT_OPPFOLGING_PENDING',
    HENT_OPPFOLGING_FEILET = 'HENT_OPPFOLGING_FEILET'
}

export interface State {
    data: Data;
    status: string;
}

export interface Data {
    underOppfolging?: boolean;
    kanReaktiveres?: boolean;
    erSykmeldtMedArbeidsgiver?: boolean;
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
        case ActionTypes.HENT_OPPFOLGING_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_OPPFOLGING_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_OPPFOLGING_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentOppfolging() {
    return doThenDispatch(() => Api.hentOppfolging(), {
        PENDING: ActionTypes.HENT_OPPFOLGING_PENDING,
        OK: ActionTypes.HENT_OPPFOLGING_OK,
        FEILET: ActionTypes.HENT_OPPFOLGING_FEILET,
    });
}

export function selectOppfolging(state: AppState): State {
    return state.oppfolging;
}