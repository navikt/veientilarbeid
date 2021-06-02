import { DataElement, STATUS } from './api';
import React from 'react';

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

export const PaabegynteSoknaderContext = React.createContext<State>(initialState);
