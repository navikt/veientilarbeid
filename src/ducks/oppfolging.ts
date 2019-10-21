import { DataElement, STATUS } from './api';
import * as React from 'react';

export enum Servicegruppe {
    IKVAL = 'IKVAL',
    BATT = 'BATT',
    BFORM = 'BFORM',
    VARIG = 'VARIG',
    IVURD = 'IVURD',
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
    underOppfolging: boolean;
    kanReaktiveres: boolean;
    reservasjonKRR: boolean;
    servicegruppe: ServicegruppeOrNull;
    formidlingsgruppe: FormidlingsgruppeOrNull;
}

export const initialState: State = {
    data: {
        underOppfolging: false,
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: null,
        formidlingsgruppe: null,
    },
    status: STATUS.NOT_STARTED
};

export const OppfolgingContext = React.createContext<State>(initialState);
