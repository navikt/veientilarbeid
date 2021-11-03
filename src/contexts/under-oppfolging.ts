import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    underOppfolging: boolean;
}

export const initialState: State = {
    data: {
        underOppfolging: false,
    },
    status: STATUS.NOT_STARTED,
};

export const UnderOppfolgingContext = React.createContext<State>(initialState);

export const useUnderOppfolgingData = () => React.useContext(UnderOppfolgingContext).data;
