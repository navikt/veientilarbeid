import * as React from 'react';
import { DataElement, STATUS } from './api';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    erBrukerUnderOppfolging: boolean;
}

export const initialState: State = {
    data: {
        erBrukerUnderOppfolging: false,
    },
    status: STATUS.NOT_STARTED,
};

export const UnderOppfolgingContext = React.createContext<State>(initialState);
