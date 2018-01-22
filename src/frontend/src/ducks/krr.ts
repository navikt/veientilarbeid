import * as Api from './api';
import { doThenDispatch, STATUS } from './utils';

export enum KrrStatustatusActions {
    HENT_KRR_STATUS_PENDING,
    HENT_KRR_STATUS_OK,
    HENT_KRR_STATUS_FEILET,
}

interface KrrStatustatus {
    reservertIKrr?: boolean;
}

export interface KrrStatusState {
    data: KrrStatustatus;
    status: string;
}

const initialState: KrrStatusState = {
    data : {},
    status: STATUS.NOT_STARTED
};

export default function (state: KrrStatusState = initialState,
                         action: {type: KrrStatustatusActions, data: {}}): KrrStatusState {
    switch (action.type) {
        case KrrStatustatusActions.HENT_KRR_STATUS_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case KrrStatustatusActions.HENT_KRR_STATUS_FEILET:
            return { ...state, status: STATUS.ERROR };
        case KrrStatustatusActions.HENT_KRR_STATUS_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentKrrStatustatus() {
    return doThenDispatch(() => Api.hentKrrStatus(), {
        PENDING: KrrStatustatusActions.HENT_KRR_STATUS_PENDING,
        OK : KrrStatustatusActions.HENT_KRR_STATUS_OK,
        FEILET: KrrStatustatusActions.HENT_KRR_STATUS_FEILET,
    });
}