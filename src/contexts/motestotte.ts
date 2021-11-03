import { DataElement, STATUS } from '../ducks/api';
import * as React from 'react';

export interface Data {
    dato: string;
}

export interface State extends DataElement {
    data: Data | null;
}

export const initialState: State = {
    data: null,
    status: STATUS.NOT_STARTED,
};

export const MotestotteContext = React.createContext<State>(initialState);

export const useMotestotteData = () => React.useContext(MotestotteContext).data;
