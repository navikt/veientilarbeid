import { createContext, useContext } from 'react';

export type Sprak = 'nb' | 'en';

export interface State {
    sprak: Sprak;
}

export const initialState: State = {
    sprak: 'nb',
};

export const SprakContext = createContext<State>(initialState);

export const useSprakValg = () => useContext(SprakContext);
