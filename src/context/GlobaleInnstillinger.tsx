import { createContext, useContext } from 'react';

interface GlobaleInnstillingerProps {
    kreverStandardInnsatsgruppe?: boolean;
}

interface GlobaleInnstillingerInputProps extends GlobaleInnstillingerProps {
    children?: JSX.Element | JSX.Element[];
}

const GlobaleInstillingerContext = createContext({} as GlobaleInnstillingerProps);

export function GlobaleInnstillingerProvider({
    children,
    kreverStandardInnsatsgruppe,
}: GlobaleInnstillingerInputProps) {
    return (
        <GlobaleInstillingerContext.Provider value={{ kreverStandardInnsatsgruppe }}>
            {children}
        </GlobaleInstillingerContext.Provider>
    );
}

export const useGlobaleInnstillinger = () => useContext(GlobaleInstillingerContext);
