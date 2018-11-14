import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_SYKEFORLOEP_METADATA_OK = 'HENT_SYKEFORLOEP_METADATA_OK',
    HENT_SYKEFORLOEP_METADATA_PENDING = 'HENT_SYKEFORLOEP_METADATA_PENDING',
    HENT_SYKEFORLOEP_METADATA_FEILET = 'HENT_SYKEFORLOEP_METADATA_FEILET'
}

export interface State {
    status: string;
    data?: Data;
}

export interface Data {
    erSykmeldt: boolean;
    sykmeldtFraDato: string | null;
    arbeidsSituasjonIAktiveSykmeldinger: any; // tslint:disable-line
    erTiltakSykmeldteInngangAktiv: boolean;
    erArbeidsrettetOppfolgingSykmeldtInngangAktiv: boolean;
}

const initialState: State = {
    status: STATUS.NOT_STARTED
};

interface Action {
    type: ActionTypes;
    data?: Data;
}

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_SYKEFORLOEP_METADATA_PENDING:
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_SYKEFORLOEP_METADATA_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_SYKEFORLOEP_METADATA_OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

export function hentSykeforloepMetadata() {
    return doThenDispatch(() => Api.hentSykeforloepMetadata(), {
        PENDING: ActionTypes.HENT_SYKEFORLOEP_METADATA_PENDING,
        OK: ActionTypes.HENT_SYKEFORLOEP_METADATA_OK,
        FEILET: ActionTypes.HENT_SYKEFORLOEP_METADATA_FEILET,
    });
}

export function selectSykeforloepMetadata(state: AppState): State {
    return state.sykeforloepMetadata;
}
