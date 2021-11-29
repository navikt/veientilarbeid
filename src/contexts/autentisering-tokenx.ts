import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    isAuthenticated: boolean;
}

export const initialState: State = {
    data: {
        isAuthenticated: false,
    },
    status: STATUS.NOT_STARTED,
};

export const AutentiseringTokenxContext = createContext<State>(initialState);

export const useAutentiseringTokenxData = () => useContext(AutentiseringTokenxContext).data;
