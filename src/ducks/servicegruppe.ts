import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_SERVICEGRUPPE_OK = 'HENT_SERVICEGRUPPE_OK',
    HENT_SERVICEGRUPPE_PENDING = 'HENT_SERVICEGRUPPE_PENDING',
    HENT_SERVICEGRUPPE_FEILET = 'HENT_SERVICEGRUPPE_FEILET'
}

export enum SituasjonOption {
    UBESTEMT = 'situasjonoption-ubestemt',
    SITUASJONSBESTEMT = 'situasjonoption-situasjonsbestemt',
    SPESIELT_TILPASSET = 'situasjonoption-spesielttilpasset',
}

export interface State {
    data: Data;
    status: string;
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

interface Action {
    type: ActionTypes;
    data: Data;
}

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_SERVICEGRUPPE_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_SERVICEGRUPPE_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_SERVICEGRUPPE_OK: {

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

export function hentServicegruppe() {
    return doThenDispatch(() => Api.hentServicegruppe(), {
        PENDING: ActionTypes.HENT_SERVICEGRUPPE_PENDING,
        OK: ActionTypes.HENT_SERVICEGRUPPE_OK,
        FEILET: ActionTypes.HENT_SERVICEGRUPPE_FEILET,
    });
}

export function selectServicegruppe(state: AppState): State {
    return state.servicegruppe;
}