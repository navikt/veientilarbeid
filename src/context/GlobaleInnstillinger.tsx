import { createContext, useContext } from 'react';

interface GlobaleInnstillierProps {
    krevStandardInnsatsgruppe?: boolean;
}

interface GlobaleInnstillingerInputProps extends GlobaleInnstillierProps {
    children?: JSX.Element | JSX.Element[];
}

const GlobaleInstillingerContext = createContext({} as GlobaleInnstillierProps);

export function GlobaleInnstillingerProvider({ children, krevStandardInnsatsgruppe }: GlobaleInnstillingerInputProps) {
    return (
        <GlobaleInstillingerContext.Provider value={{ krevStandardInnsatsgruppe }}>
            {children}
        </GlobaleInstillingerContext.Provider>
    );
}

export const useGlobaleInnstillinger = () => useContext(GlobaleInstillingerContext);
