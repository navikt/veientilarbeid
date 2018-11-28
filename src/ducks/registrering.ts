import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_REGISTRERING_OK = 'HENT_REGISTRERING_OK',
    HENT_REGISTRERING_PENDING = 'HENT_REGISTRERING_PENDING',
    HENT_REGISTRERING_FEILET = 'HENT_REGISTRERING_FEILET'
}

export enum RegistreringType {
    ORDINAER = 'ORDINAER',
    SYKMELDT = 'SYKMELDT'
}

export enum FremtidigSituasjonSvar {
    SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
    NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
    USIKKER = 'USIKKER',
    INGEN_PASSER = 'INGEN_PASSER'
}

export interface Besvarelse {
    fremtidigSituasjon: FremtidigSituasjonSvar;
}

export interface Registrering {
    besvarelse: Besvarelse;
}

export interface State {
    status: string;
    data?: Data;
}

export interface Data {
    type: RegistreringType;
    registrering: Registrering;
}

const initialState: State = {
    status: STATUS.NOT_STARTED,
};

interface Action {
    type: ActionTypes;
    data?: Data;
}

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_REGISTRERING_PENDING:
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_REGISTRERING_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_REGISTRERING_OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

export function hentRegistrering() {
    return doThenDispatch(() => Api.hentRegistrering(), {
        PENDING: ActionTypes.HENT_REGISTRERING_PENDING,
        OK: ActionTypes.HENT_REGISTRERING_OK,
        FEILET: ActionTypes.HENT_REGISTRERING_FEILET,
    });
}

export function selectRegistrering(state: AppState): State {
    return state.registrering;
}
