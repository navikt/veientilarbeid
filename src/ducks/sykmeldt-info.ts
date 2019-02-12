import {
    ActionType, Handling, HentSykmeldtInfoFEILETAction, HentSykmeldtInfoOKAction, HentSykmeldtInfoPENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { AppState } from '../reducer';
import { hentSykmeldtInfoFetch, DataElement, STATUS } from './api';
import { doThenDispatch } from './api-utils';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    erSykmeldtMedArbeidsgiver: boolean;
}

const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        erSykmeldtMedArbeidsgiver: false
    }
};

export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_SYKMELDT_INFO_PENDING:
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_SYKMELDT_INFO_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENT_SYKMELDT_INFO_OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

export function hentSykmeldtInfo(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<Data>(() => hentSykmeldtInfoFetch(), {
        ok: hentSykmeldtInfoOk,
        feilet: hentSykmeldtInfoFeilet,
        pending: hentSykmeldtInfoPending,
    });
}

function hentSykmeldtInfoOk(sykmeldtinfo: Data): HentSykmeldtInfoOKAction {
    return {
        type: ActionType.HENT_SYKMELDT_INFO_OK,
        data: sykmeldtinfo
    };
}

function hentSykmeldtInfoFeilet(): HentSykmeldtInfoFEILETAction {
    return {
        type: ActionType.HENT_SYKMELDT_INFO_FEILET,
    };
}

function hentSykmeldtInfoPending(): HentSykmeldtInfoPENDINGAction {
    return {
        type: ActionType.HENT_SYKMELDT_INFO_PENDING,
    };
}

export function selectSykmeldtInfo(state: AppState): State {
    return state.sykmeldtInfodata;
}
