import {
    ActionType, Handling, HentOppfolgingFEILETAction, HentOppfolgingOKAction, HentOppfolgingPENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { hentOppfolgingFetch, DataElement, STATUS } from './api';
import { doThenDispatch } from './api-utils';

export enum Servicegruppe {
    IKVAL = 'IKVAL',
    BATT = 'BATT',
    BFORM = 'BFORM',
    VARIG = 'VARIG',
    IVURD = 'IVURD',
}

export type ServicegruppeOrNull = Servicegruppe | null;

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    underOppfolging: boolean;
    kanReaktiveres: boolean;
    reservasjonKRR: boolean;
    servicegruppe: ServicegruppeOrNull;
}

const initialState: State = {
    data: {
        underOppfolging: false,
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: null,
    },
    status: STATUS.NOT_STARTED
};

//  Reducer
export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_OPPFOLGING_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_OPPFOLGING_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENT_OPPFOLGING_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentOppfolging(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<Data>(() => hentOppfolgingFetch(), {
        ok: hentOppfolgingOk,
        feilet: hentOppfolgingFeilet,
        pending: hentOppfolgingPending,
    });
}

function hentOppfolgingOk(data: Data): HentOppfolgingOKAction {
    return {
        type: ActionType.HENT_OPPFOLGING_OK,
        data: data
    };
}

function hentOppfolgingFeilet(): HentOppfolgingFEILETAction {
    return {
        type: ActionType.HENT_OPPFOLGING_FEILET,
    };
}

function hentOppfolgingPending(): HentOppfolgingPENDINGAction {
    return {
        type: ActionType.HENT_OPPFOLGING_PENDING,
    };
}