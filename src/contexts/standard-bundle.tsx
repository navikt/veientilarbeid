import { createContext, ReactNode, useContext } from 'react';

interface StandardBundleProviderType {
    erStandardBundle: boolean;
}

const StandardBundleContext = createContext<StandardBundleProviderType>({ erStandardBundle: false });

function StandardBundleProvider(props: { children: ReactNode; erStandardBundle: boolean }) {
    return (
        <StandardBundleContext.Provider value={{ erStandardBundle: props.erStandardBundle }}>
            {props.children}
        </StandardBundleContext.Provider>
    );
}

function useErStandardBundle() {
    const context = useContext(StandardBundleContext);

    if (context === undefined) {
        throw new Error('useErStandardBundle må brukes under en StandardBundleProvider');
    }

    return context;
}

export { StandardBundleProvider, useErStandardBundle };
