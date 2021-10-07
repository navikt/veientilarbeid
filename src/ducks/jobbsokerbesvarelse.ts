import { DataElement, STATUS } from './api';
import { createContext } from 'react';

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {},
    status: STATUS.NOT_STARTED,
};

export interface Data {
    raad?: any[];
}

export const JobbsokerbesvarelseContext = createContext<State>(initialState);
