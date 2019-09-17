import { DataElement, STATUS } from './api';
import * as React from 'react';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    erSykmeldtMedArbeidsgiver: boolean;
}

export const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        erSykmeldtMedArbeidsgiver: false
    }
};

export const SykmeldtInfoContext = React.createContext<State>(initialState);
