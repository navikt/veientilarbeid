import { DataElement, STATUS } from './api';
import React from 'react';

export interface State extends DataElement {
    data: Data;
}

interface Tema {
    temakode: string;
    temanavn: string;
    erGruppert: boolean;
    behandlingskjeder: any[];
    dokumentMetadata: any[];
    tilhorendeSaker: any[];
    feilkoder: any[];
}

export interface Data {
    sakstema: Tema[];
    feilendeBaksystemer: any[];
}

export const initialState: State = {
    data: {
        sakstema: [],
        feilendeBaksystemer: [],
    },
    status: STATUS.NOT_STARTED,
};

export const SakstemaContext = React.createContext<State>(initialState);
