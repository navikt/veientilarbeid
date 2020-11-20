import * as React from 'react';
import { DataElement, STATUS } from './api';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    erUnderOppfolging: boolean;
}

export const initialState: State = {
    data: {
        erUnderOppfolging: false
    },
    status: STATUS.NOT_STARTED,
};

export const UnderOppfolgingContext = React.createContext<State>(initialState);
