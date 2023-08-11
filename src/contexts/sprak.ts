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

export function hentSprakFraUrl(url: string) {
    return [
        {
            regExp: /\/n(b|o)($|\/)/,
            sprak: 'nb',
        },
        {
            regExp: /\/en($|\/)/,
            sprak: 'en',
        },
        {
            regExp: /\/nn($|\/)/,
            sprak: 'nn',
        },
    ].find(({ regExp }) => regExp.test(url))?.sprak;
}
export const hentSprakValgFraUrl = (): State => {
    const urlParams = new URLSearchParams(window.location.search);
    const sprakFraUrlParam = urlParams.get('lang');
    const sprakFraUrl = sprakFraUrlParam ?? hentSprakFraUrl(window.location.href);
    const setGyldigSprak = (sprak?: string): Sprak => {
        return (['en', 'nb', 'nn'].includes(sprak as any) ? sprak : 'nb') as Sprak;
    };

    return {
        sprak: setGyldigSprak(sprakFraUrl),
    };
};
