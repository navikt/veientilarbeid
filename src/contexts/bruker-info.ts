import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export enum RegistreringType {
    REAKTIVERING = 'REAKTIVERING',
    SPERRET = 'SPERRET',
    ALLEREDE_REGISTRERT = 'ALLEREDE_REGISTRERT',
    SYKMELDT_REGISTRERING = 'SYKMELDT_REGISTRERING',
    ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING',
}

export type RegistreringTypeOrIngenVerdi = RegistreringType | 'INGEN_VERDI';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    erSykmeldtMedArbeidsgiver: boolean;
    registreringType?: RegistreringTypeOrIngenVerdi;
    geografiskTilknytning?: string;
    rettighetsgruppe: string;
    alder: number;
}

export const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        erSykmeldtMedArbeidsgiver: false,
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: '',
        rettighetsgruppe: 'INGEN_VERDI',
        alder: 0,
    },
};

export const BrukerInfoContext = createContext<State>(initialState);

export const useBrukerinfoData = () => useContext(BrukerInfoContext).data;
