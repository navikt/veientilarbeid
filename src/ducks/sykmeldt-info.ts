import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum RegistreringType {
    ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING',
    SYKMELDT_REGISTRERING = 'SYKMELDT_REGISTRERING'
}

export enum ActionTypes {
    HENT_SYKMELDT_INFO_OK = 'HENT_SYKMELDT_INFO_OK',
    HENT_SYKMELDT_INFO_PENDING = 'HENT_SYKMELDT_INFO_PENDING',
    HENT_SYKMELDT_INFO_FEILET = 'HENT_SYKMELDT_INFO_FEILET'
}

export interface State {
    status: string;
    data?: Data;
}

export interface Data {
    registreringType: RegistreringType;
}

const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        registreringType: RegistreringType.ORDINAER_REGISTRERING
    }
};

interface Action {
    type: ActionTypes;
    data?: Data;
}

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_SYKMELDT_INFO_PENDING:
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_SYKMELDT_INFO_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_SYKMELDT_INFO_OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

export function hentSykmeldtInfo() {
    return doThenDispatch(() => Api.hentSykmeldtInfo(), {
        PENDING: ActionTypes.HENT_SYKMELDT_INFO_PENDING,
        OK: ActionTypes.HENT_SYKMELDT_INFO_OK,
        FEILET: ActionTypes.HENT_SYKMELDT_INFO_FEILET,
    });
}

export function selectSykmeldtInfo(state: AppState): State {
    return state.sykmeldtInfodata;
}
