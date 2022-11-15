import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData } from './feature-toggles';
import { useAmplitudeData } from './amplitude-context';

import { fetchToJson } from '../ducks/api-utils';
import { MELDEPLIKT_URL, requestConfig } from '../ducks/api';

export type MeldeKortType = 'ELEKTRONISK' | 'AAP' | 'MANUELL_ARENA' | 'ORDINAER_MANUELL' | 'KORRIGERT_ELEKTRONISK';

export type Meldeplikt = {
    erArbeidssokerNestePeriode: boolean;
    periodeFra: string;
    periodeTil: string;
    meldekorttype: MeldeKortType;
    eventOpprettet: string;
};

interface MeldpliktProviderType {
    meldeplikt: Meldeplikt | null;
}

export const MeldepliktContext = createContext<MeldpliktProviderType>({
    meldeplikt: null,
});

function MeldepliktProvider(props: { children: ReactNode }) {
    const featureToggleData = useFeatureToggleData();
    const { oppdaterAmplitudeData } = useAmplitudeData();
    const brukMeldeplikt = featureToggleData['veientilarbeid.bruk-meldeplikt-hendelser'];
    const [meldeplikt, settMeldeplikt] = useState<Meldeplikt | null>(null);

    const hentMeldeplikt = async () => {
        const sisteMeldekortUrl = `${MELDEPLIKT_URL}/siste`;
        try {
            const meldeplikt: Meldeplikt = await fetchToJson(sisteMeldekortUrl, requestConfig());
            if (meldeplikt) {
                settMeldeplikt(meldeplikt);
                oppdaterAmplitudeData({
                    vilFortsattVaereRegistrert: meldeplikt.erArbeidssokerNestePeriode ? 'Ja' : 'Nei',
                });
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
