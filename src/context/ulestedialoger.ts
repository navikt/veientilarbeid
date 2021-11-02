import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

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
export const useUlesteDialogerData = () => useContext(UlesteDialogerContext).data;
