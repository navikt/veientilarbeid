import { DataElement, STATUS } from './api';
import React from 'react';

export interface State extends DataElement {
    data: Data;
}

interface Ettersendelse {
    navnPaSoknad: string;
    vedleggSomSkalEttersendes: any[];
    lenkeTilEttersending: string;
}

export type Data = Ettersendelse[];

export const initialState: State = {
    data: [],
    status: STATUS.NOT_STARTED,
};

export const MuligeEttersendelserContext = React.createContext<State>(initialState);
