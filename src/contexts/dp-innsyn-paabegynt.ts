import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export interface State extends DataElement {
    data: Data;
}

export interface DpInnsynPaabegynt {
    tittel: string;
    behandlingsId: string;
    sistEndret: string;
}

export type Data = DpInnsynPaabegynt[];

export const initialState: State = {
    data: [],
    status: STATUS.NOT_STARTED,
};

export const DpInnsynPaabegyntContext = createContext<State>(initialState);

export const useDpInnsynPaabegyntData = () => useContext(DpInnsynPaabegyntContext).data;
