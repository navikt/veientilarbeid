import { DataElement, STATUS } from './api';
import * as React from 'react';

export enum RegistreringType {
    REAKTIVERING = 'REAKTIVERING',
    SPERRET = 'SPERRET',
    ALLEREDE_REGISTRERT = 'ALLEREDE_REGISTRERT',
    SYKMELDT_REGISTRERING = 'SYKMELDT_REGISTRERING',
    ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING'
}

export enum Servicegruppe {
    BATT = 'BATT',
    BFORM = 'BFORM',
    BKART = 'BKART',
    IKVAL = 'IKVAL',
    IVURD = 'IVURD',
    OPPFI = 'OPPFI',
    VARIG = 'VARIG',
    VURDI = 'VURDI',
    VURDU = 'VURDU'
}

export enum Formidlingsgruppe {
    ARBS = 'ARBS',
    IARBS = 'IARBS',
    ISERV = 'ISERV',
}

export type FormidlingsgruppeOrNull = Formidlingsgruppe | null;

export type ServicegruppeOrNull = Servicegruppe | null;

export type RegistreringTypeOrIngenVerdi = RegistreringType | 'INGEN_VERDI';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    underOppfolging: boolean;
    kanReaktiveres: boolean;
    reservasjonKRR: boolean;
    servicegruppe: ServicegruppeOrNull;
    formidlingsgruppe: FormidlingsgruppeOrNull;
    registreringType?: RegistreringTypeOrIngenVerdi;
    geografiskTilknytning?: string;
}

export const initialState: State = {
    data: {
        underOppfolging: false,
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: null,
        formidlingsgruppe: null,
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: ''

    },
    status: STATUS.NOT_STARTED
};

export const OppfolgingContext = React.createContext<State>(initialState);
