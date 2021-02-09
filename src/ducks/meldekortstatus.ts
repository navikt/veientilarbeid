import { DataElement, STATUS } from './api';
import React from 'react';

export interface State extends DataElement {
    data: Data;
}

interface NesteMeldekort {
    uke: string;
    kanSendesFra: string;
    til: string;
    fra: string;
}

export interface Data {
    meldekort?: number;
    etterregistrerteMeldekort?: number;
    antallGjenstaaendeFeriedager?: number;
    nesteMeldekort?: NesteMeldekort;
    nesteInnsendingAvMeldekort?: string;
}

export const initialState: State = {
    data: {},
    status: STATUS.NOT_STARTED,
};

export const MeldekortstatusContext = React.createContext<State>(initialState);
