import { createContext, useContext } from 'react';

interface GlobaleInnstillingerProps {
    krevStandardInnsatsgruppe?: boolean;
}

interface GlobaleInnstillingerInputProps extends GlobaleInnstillingerProps {
    children?: JSX.Element | JSX.Element[];
}

const GlobaleInstillingerContext = createContext({} as GlobaleInnstillingerProps);

export function GlobaleInnstillingerProvider({ children, krevStandardInnsatsgruppe }: GlobaleInnstillingerInputProps) {
    return (
        <GlobaleInstillingerContext.Provider value={{ krevStandardInnsatsgruppe }}>
            {children}
        </GlobaleInstillingerContext.Provider>
    );
}

export const useGlobaleInnstillinger = () => useContext(GlobaleInstillingerContext);
