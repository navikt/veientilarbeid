import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export interface State extends DataElement {
    data: Data;
}

export interface Soknad {
    tittel: string;
    lenke: string;
    dato: string;
    kilde: string;
}

export interface Data {
    soknader: Soknad[];
    feilendeBaksystemer: any[];
}

export const initialState: State = {
    data: {
        soknader: [],
        feilendeBaksystemer: [],
    },
    status: STATUS.NOT_STARTED,
};

export const PaabegynteSoknaderContext = createContext<State>(initialState);
export const usePaabegynteSoknaderData = () => useContext(PaabegynteSoknaderContext).data;
