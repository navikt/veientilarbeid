import { createContext, useContext } from 'react';

export type Sprak = 'nb' | 'en' | 'nn';

export interface State {
    sprak: Sprak;
}

export const initialState: State = {
    sprak: 'nb',
};

export const SprakContext = createContext<State>(initialState);

export const useSprakValg = () => useContext(SprakContext);

export const hentSprakValgFraUrl = (): State => {
    const urlParams = new URLSearchParams(window.location.search);
    const sprakFraUrl = urlParams.get('lang') || 'nb';
    const setGyldigSprak = (sprak: string): Sprak => {
        return (['en', 'nb'].includes(sprak) ? sprak : 'nb') as Sprak;
    };
    // const cookieVerdi = hentSprakValgFraCookie();

    return {
        // sprak: (urlParams.get('lang')) || cookieVerdi || 'nb') as SprakValg.Sprak,
        sprak: setGyldigSprak(sprakFraUrl),
    };
};
