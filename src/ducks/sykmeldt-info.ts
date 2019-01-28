import {
    ActionType, Handling, HentSykmeldtInfoFEILETAction, HentSykmeldtInfoOKAction, HentSykmeldtInfoPENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { AppState } from '../reducer';
import { hentSykmeldtInfoFetch, DataElement, STATUS } from './api';
import { doThenDispatch } from './api-utils';

export interface State extends DataElement {
    erSykmeldtMedArbeidsgiver: boolean;
}

const initialState: State = {
    status: STATUS.NOT_STARTED,
    erSykmeldtMedArbeidsgiver: false
};

export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_SYKMELDT_INFO_PENDING:
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_SYKMELDT_INFO_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENT_SYKMELDT_INFO_OK:
            return {...state, status: STATUS.OK, erSykmeldtMedArbeidsgiver: action.data.erSykmeldtMedArbeidsgiver};
        default:
            return state;
    }
}

export function hentSykmeldtInfo(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<State>(() => hentSykmeldtInfoFetch(), {
        ok: hentSykmeldtInfoOk,
        feilet: hentSykmeldtInfoFeilet,
        pending: hentSykmeldtInfoPending,
    });
}

function hentSykmeldtInfoOk(oppfolging: State): HentSykmeldtInfoOKAction {
    return {
        type: ActionType.HENT_SYKMELDT_INFO_OK,
        data: oppfolging
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
