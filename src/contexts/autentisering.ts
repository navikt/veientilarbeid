import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export enum InnloggingsNiva {
    LEVEL_1 = '1',
    LEVEL_2 = '2',
    LEVEL_3 = '3',
    LEVEL_4 = '4',
    UKJENT = 'Ukjent',
}

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    securityLevel: InnloggingsNiva;
    authenticated: boolean;
}

export const initialState: State = {
    data: {
        securityLevel: InnloggingsNiva.UKJENT,
        authenticated: false,
    },
    status: STATUS.NOT_STARTED,
};

export const AutentiseringContext = createContext<State>(initialState);

export const useAutentiseringData = () => useContext(AutentiseringContext).data;
