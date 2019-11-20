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

export type FormidlingsgruppeOrIngenVerdi = Formidlingsgruppe | 'INGEN_VERDI';

export type ServicegruppeOrIngenVerdi = Servicegruppe | 'INGEN_VERDI';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    underOppfolging: boolean;
    kanReaktiveres: boolean;
    reservasjonKRR: boolean;
    servicegruppe: ServicegruppeOrIngenVerdi;
    formidlingsgruppe: FormidlingsgruppeOrIngenVerdi;
}

export const initialState: State = {
    data: {
        underOppfolging: false,
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: 'INGEN_VERDI',
        formidlingsgruppe: 'INGEN_VERDI',
    },
    status: STATUS.NOT_STARTED
};

export const OppfolgingContext = React.createContext<State>(initialState);
