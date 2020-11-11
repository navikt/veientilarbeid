import { DataElement, STATUS } from './api';
import React from 'react';

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {},
    status: STATUS.NOT_STARTED,
};

export interface Data {
    raad?: [];
}

export const JobbsokerbesvarelseContext = React.createContext<State>(initialState);
