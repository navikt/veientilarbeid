import { createContext, useContext } from 'react';

import { DataElement, STATUS } from '../ducks/api';

export interface State extends DataElement {
    data: Data | null;
}

export interface Periode {
    fraOgMedDato: string;
    tilOgMedDato: string | null;
}

export interface Data {
    underoppfolging: {
        status: number;
        underoppfolging?: boolean;
    };
    arbeidssokerperioder: {
        status: number;
        arbeidssokerperioder: Periode[];
    };
}

export const initialState: State = {
    data: null,
    status: STATUS.NOT_STARTED,
};

export const ArbeidssokerContext = createContext<State>(initialState);

export const useUnderOppfolging = () => useContext(ArbeidssokerContext).data?.underoppfolging;
export const useArbeidssokerPerioder = () => useContext(ArbeidssokerContext).data?.arbeidssokerperioder;
