import {
    ActionType, Handling, HentServicegruppeFEILETAction, HentServicegruppeOKAction, HentServicegruppePENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { AppState } from '../reducer';
import { doThenDispatch } from './api-utils';
import { hentServicegruppeFetch, DataElement, STATUS } from './api';

export enum Servicegruppe {
    IKVAL = 'Standard',
    BATT = 'Spesielt tilpasset',
    BFORM = 'Situasjonsbestemt',
    VARIG = 'Varig',
    IVURD = 'Ikke fastsatt',
}

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    servicegruppe: Servicegruppe;
}

const initialState: State = {
    data: {
        servicegruppe: Servicegruppe.IKVAL,
    },
    status: STATUS.NOT_STARTED
};

export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_SERVICEGRUPPE_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_SERVICEGRUPPE_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENT_SERVICEGRUPPE_OK: {

            const servicegruppekode: string =  action.data.servicegruppe;

            return {
                ...state,
                status: STATUS.OK,
                data: {
                    servicegruppe: Servicegruppe[servicegruppekode],
                }
            };
        }
        default:
            return state;
    }
}

export function hentServicegruppe(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<Data>(() => hentServicegruppeFetch(), {
        ok: hentServicegruppeOk,
        feilet: hentServicegruppeFeilet,
        pending: hentServicegruppePending,
    });
}

function hentServicegruppeOk(servicegruppeData: Data): HentServicegruppeOKAction {
    return {
        type: ActionType.HENT_SERVICEGRUPPE_OK,
        data: servicegruppeData
    };
}

function hentServicegruppeFeilet(): HentServicegruppeFEILETAction {
    return {
        type: ActionType.HENT_SERVICEGRUPPE_FEILET,
    };
}

function hentServicegruppePending(): HentServicegruppePENDINGAction {
    return {
        type: ActionType.HENT_SERVICEGRUPPE_PENDING,
    };
}

export function selectServicegruppe(state: AppState): State {
    return state.servicegruppe;
}
