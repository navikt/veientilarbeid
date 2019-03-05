import {
    ActionType, Handling, HentServicegruppeFEILETAction, HentServicegruppeOKAction, HentServicegruppePENDINGAction,
} from './actions';
import { Dispatch } from '../dispatch-type';
import { AppState } from '../reducer';
import { doThenDispatch } from './api-utils';
import { hentServicegruppeFetch, DataElement, STATUS } from './api';

export enum SituasjonOption {
    UBESTEMT = 'situasjonoption-ubestemt',
    SITUASJONSBESTEMT = 'situasjonoption-situasjonsbestemt',
    SPESIELT_TILPASSET = 'situasjonoption-spesielttilpasset',
}

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    servicegruppe: SituasjonOption;
}

const initialState: State = {
    data: {
        servicegruppe: SituasjonOption.UBESTEMT
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

            const servicegruppe: string =  action.data.servicegruppe;
            const situasjonsMap = {
                'BATT': SituasjonOption.SPESIELT_TILPASSET,
                'BFORM': SituasjonOption.SITUASJONSBESTEMT,
            };
            return {
                ...state,
                status: STATUS.OK,
                data: Object.keys(situasjonsMap).includes(servicegruppe)
                    ? {servicegruppe: situasjonsMap[servicegruppe]}
                    : {servicegruppe: SituasjonOption.UBESTEMT}
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
