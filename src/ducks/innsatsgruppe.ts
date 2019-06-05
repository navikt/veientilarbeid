import * as React from 'react';
import { DataElement, STATUS } from './api';

export enum Innsatsgruppe {
    IKVAL = 'IKVAL',
    BATT = 'BATT',
    BFORM = 'BFORM',
    VARIG = 'VARIG',
    IVURD = 'IVURD',
}

export interface Data {
    servicegruppe: Innsatsgruppe;
}

export interface State extends DataElement {
    data: Data | null;
}

export const initialState = {
    data: null,
    status: STATUS.NOT_STARTED,
};

export const InnsatsgruppeContext = React.createContext<State>(initialState);

