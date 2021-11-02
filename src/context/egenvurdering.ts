import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export interface Data {
    sistOppdatert: string;
}

export interface State extends DataElement {
    data: Data | null;
}

export const initialState: State = {
    data: null,
    status: STATUS.NOT_STARTED,
};

export const EgenvurderingContext = createContext<State>(initialState);

export const useEgenvurdering = () => useContext(EgenvurderingContext).data;
