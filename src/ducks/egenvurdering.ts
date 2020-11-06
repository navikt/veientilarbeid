import { DataElement, STATUS } from './api';
import React from 'react';

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

export const EgenvurderingContext = React.createContext<State>(initialState);
