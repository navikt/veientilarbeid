import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData } from './feature-toggles';

import { fetchToJson } from '../ducks/api-utils';
import { MELDEPLIKT_URL, requestConfig } from '../ducks/api';

export type MeldeKortType = 'MANUELL_ARENA';

export type Meldeplikt = {
    erArbeidssokerNestePeriode: boolean;
    periodeFra: string;
    periodeTil: string;
    meldekorttype: MeldeKortType;
    eventOpprettet: string;
};

interface MeldpliktProviderType {
    meldeplikt: Meldeplikt[] | null;
}

export const MeldepliktContext = createContext<MeldpliktProviderType>({
    meldeplikt: null,
});

function MeldepliktProvider(props: { children: ReactNode }) {
    const featureToggleData = useFeatureToggleData();
    const brukMeldeplikt = featureToggleData['veientilarbeid.bruk-meldeplikt-hendelser'];
    const [meldeplikt, settMeldeplikt] = useState<Meldeplikt[] | null>(null);

    const hentMeldeplikt = async () => {
        try {
            const meldeplikt = await fetchToJson(MELDEPLIKT_URL, requestConfig());
            if (meldeplikt) {
                settMeldeplikt(meldeplikt as Meldeplikt[]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (brukMeldeplikt) {
            hentMeldeplikt();
        }
    }, [brukMeldeplikt]);

    const contextValue = {
        meldeplikt,
    };

    return <MeldepliktContext.Provider value={contextValue}>{props.children}</MeldepliktContext.Provider>;
}

function useMeldeplikt() {
    const context = useContext(MeldepliktContext);

    if (context === undefined) {
        throw new Error('useMeldeplikt må brukes under en MeldepliktProvider');
    }

    return context;
}

export { MeldepliktProvider, useMeldeplikt };
