import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export interface State extends DataElement {
    data: Data;
}

export interface DpInnsynPaabegyntSoknad {
    tittel: string;
    behandlingsId: string;
    sistEndret: string;
}

export type Data = DpInnsynPaabegyntSoknad[];

export const initialState: State = {
    data: [],
    status: STATUS.NOT_STARTED,
};

export const DpInnsynPaabegynteSoknaderContext = createContext<State>(initialState);

export const useDpInnsynPaabegynteSoknaderData = () => useContext(DpInnsynPaabegynteSoknaderContext).data;
