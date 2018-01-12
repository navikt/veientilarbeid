import * as Api from './api';
import { doThenDispatch, STATUS } from './utils';

export enum RegistreringStatusActions {
    HENT_REGISTRERINGSTATUS_PENDING,
    HENT_REGISTRERINGSTATUS_OK,
    HENT_REGISTRERINGSTATUS_FEILET,
}

interface RegistreringStatus {
    reservertIKrr?: boolean;
}

export interface RegStatusState {
    data: RegistreringStatus;
    status: string;
}

const initialState: RegStatusState = {
    data : {},
    status: STATUS.NOT_STARTED
};

export default function (state: RegStatusState = initialState,
                         action: {type: RegistreringStatusActions, data: {}}): RegStatusState {
    switch (action.type) {
        case RegistreringStatusActions.HENT_REGISTRERINGSTATUS_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case RegistreringStatusActions.HENT_REGISTRERINGSTATUS_FEILET:
            return { ...state, status: STATUS.ERROR };
        case RegistreringStatusActions.HENT_REGISTRERINGSTATUS_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentRegistreringStatus() {
    return doThenDispatch(() => Api.hentKrrStatus(), {
        PENDING: RegistreringStatusActions.HENT_REGISTRERINGSTATUS_PENDING,
        OK : RegistreringStatusActions.HENT_REGISTRERINGSTATUS_OK,
        FEILET: RegistreringStatusActions.HENT_REGISTRERINGSTATUS_FEILET,
    });
}