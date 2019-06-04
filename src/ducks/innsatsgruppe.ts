import {
    ActionType, Handling, HentInnsatsgruppeFEILETAction, HentInnsatsgruppeOKAction, HentInnsatsgruppePENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { doThenDispatch } from './api-utils';
import { hentInnsatsgruppeFetch, DataElement, STATUS } from './api';

export enum Innsatsgruppe {
    IKVAL = 'Standard',
    BATT = 'Spesielt tilpasset',
    BFORM = 'Situasjonsbestemt',
    VARIG = 'Varig',
    IVURD = 'Ikke fastsatt',
}

export interface State extends DataElement {
    data: Data;
}

export interface FetchData {
    servicegruppe: Innsatsgruppe;
}

export interface Data {
    innsatsgruppe: Innsatsgruppe;
}

const initialState: State = {
    data: {
        innsatsgruppe: Innsatsgruppe.IKVAL,
    },
    status: STATUS.NOT_STARTED
};

export default function reducer(state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_INNSATSGRUPPE_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_INNSATSGRUPPE_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENT_INNSATSGRUPPE_OK: {

            const innsatsgruppekode: string =  action.data.servicegruppe;

            return {
                ...state,
                status: STATUS.OK,
                data: {
                    innsatsgruppe: Innsatsgruppe[innsatsgruppekode],
                }
            };
        }
        default:
            return state;
    }
}

export function hentInnsatsgruppe(): (dispatch: Dispatch) => Promise<void> {
    return doThenDispatch<FetchData>(() => hentInnsatsgruppeFetch(), {
        ok: hentInnsatsgruppeOk,
        feilet: hentInnsatsgruppeFeilet,
        pending: hentInnsatsgruppePending,
    });
}

function hentInnsatsgruppeOk(innsatsgruppeData: FetchData): HentInnsatsgruppeOKAction {
    return {
        type: ActionType.HENT_INNSATSGRUPPE_OK,
        data: innsatsgruppeData
    };
}

function hentInnsatsgruppeFeilet(): HentInnsatsgruppeFEILETAction {
    return {
        type: ActionType.HENT_INNSATSGRUPPE_FEILET,
    };
}

function hentInnsatsgruppePending(): HentInnsatsgruppePENDINGAction {
    return {
        type: ActionType.HENT_INNSATSGRUPPE_PENDING,
    };
}
