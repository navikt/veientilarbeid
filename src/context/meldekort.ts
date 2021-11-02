import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export interface State extends DataElement {
    data: Data | null;
}

interface MeldeperiodeInn {
    fra?: string;
    til?: string;
    kortKanSendesFra?: string;
    kanKortSendes?: boolean;
    periodeKode?: string;
}

export interface Meldekort {
    mottattDato?: string | null;
    meldeperiode?: MeldeperiodeInn | null;
    meldegruppe?: string | null;
}

export interface Data {
    meldekort?: Meldekort[];
}

export const initialState: State = {
    data: null,
    status: STATUS.NOT_STARTED,
};

export const MeldekortContext = createContext<State>(initialState);

export const useMeldekortData = () => useContext(MeldekortContext).data;
