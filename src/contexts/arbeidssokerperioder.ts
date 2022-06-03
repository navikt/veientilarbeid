import { createContext, useContext } from 'react';

import { DataElement, STATUS } from '../ducks/api';

export interface State extends DataElement {
    data: Data | null;
}

interface Periode {
    fraOgMedDato: string;
    tilOgMedDato: string | null;
}

export interface Data {
    arbeidssokerperioder: Periode[];
}

export const initialState: State = {
    data: null,
    status: STATUS.NOT_STARTED,
};

export const ArbeidssokerperioderContext = createContext<State>(initialState);

export const useArbeidssokerperioderData = () => useContext(ArbeidssokerperioderContext).data?.arbeidssokerperioder;
