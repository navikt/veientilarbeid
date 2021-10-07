import { DataElement, STATUS } from './api';
import { createContext } from 'react';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    antallUleste: number;
}

export const initialState: State = {
    data: {
        antallUleste: 0,
    },
    status: STATUS.NOT_STARTED,
};

export const UlesteDialogerContext = createContext<State>(initialState);
