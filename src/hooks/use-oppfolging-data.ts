import { useArbeidssokerData } from './use-arbeidssoker-data';
import { DataElement, STATUS } from '../ducks/api';

export enum Servicegruppe {
    BATT = 'BATT',
    BFORM = 'BFORM',
    BKART = 'BKART',
    IKVAL = 'IKVAL',
    IVURD = 'IVURD',
    OPPFI = 'OPPFI',
    VARIG = 'VARIG',
    VURDI = 'VURDI',
    VURDU = 'VURDU',
}

export enum Formidlingsgruppe {
    ARBS = 'ARBS',
    IARBS = 'IARBS',
    ISERV = 'ISERV',
}

export type FormidlingsgruppeOrNull = Formidlingsgruppe | null;

export type ServicegruppeOrNull = Servicegruppe | null;

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    kanReaktiveres: boolean;
    reservasjonKRR: boolean;
    servicegruppe: ServicegruppeOrNull;
    formidlingsgruppe: FormidlingsgruppeOrNull;
}

export const initialState: State = {
    data: {
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: null,
        formidlingsgruppe: null,
    },
    status: STATUS.NOT_STARTED,
};

export const useOppfolgingData = () => useArbeidssokerData().data?.oppfolging.data ?? initialState.data;
