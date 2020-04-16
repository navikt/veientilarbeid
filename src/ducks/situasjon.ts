import { DataElement, STATUS } from './api';
import * as React from 'react';

export interface Data {
  opprettet: string;
  endretAv: string;
  svarId: string;
  svarTekst: string;
}

export interface State extends DataElement {
    data: Data | null;
}

export const initialState: State = {
    data: null,
    status: STATUS.NOT_STARTED
};

export const SituasjonContext = React.createContext<State>(initialState);
