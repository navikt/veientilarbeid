import { DataElement, STATUS } from './api';
import * as React from 'react';

export enum RegistreringType {
  REAKTIVERING = 'REAKTIVERING',
  SPERRET = 'SPERRET',
  ALLEREDE_REGISTRERT = 'ALLEREDE_REGISTRERT',
  SYKMELDT_REGISTRERING = 'SYKMELDT_REGISTRERING',
  ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING'
}

export type RegistreringTypeOrIngenVerdi = RegistreringType | 'INGEN_VERDI';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    erSykmeldtMedArbeidsgiver: boolean;
    registreringType?: RegistreringTypeOrIngenVerdi;
    geografiskTilknytning?: string;
    rettighetsgruppe?: string;
}

export const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        erSykmeldtMedArbeidsgiver: false,
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: '',
        rettighetsgruppe: 'INGEN_VERDI'
    }
};

export const BrukerInfoContext = React.createContext<State>(initialState);
