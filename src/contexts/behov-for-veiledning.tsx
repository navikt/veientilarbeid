import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { fetchToJson } from '../ducks/api-utils';
import { BEHOV_FOR_VEILEDNING_URL, requestConfig } from '../ducks/api';
import { useFeatureToggleData } from './feature-toggles';

export type BehovForVeiledningValg = 'KLARE_SEG_SELV' | 'ONSKER_OPPFOLGING' | 'IKKE_BESVART';

export type BehovForVeiledningData = {
    dato?: string;
    oppfolging: BehovForVeiledningValg;
} | null;

interface BehovForVeiledningProviderType {
    behovForVeiledning: BehovForVeiledningData;
    lagreBehovForVeiledning: (behovForVeiledning: BehovForVeiledningValg) => Promise<void>;
}

export const BehovForVeiledningContext = createContext<BehovForVeiledningProviderType>({
    behovForVeiledning: null,
    lagreBehovForVeiledning: () => Promise.resolve(),
});

function BehovForVeiledningProvider(props: { children: ReactNode }) {
    const [behovForVeiledning, settBehovForVeiledning] = useState<BehovForVeiledningData>(null);
    const featureToggleData = useFeatureToggleData();

    const hentBehovForVeiledning = async () => {
        try {
            const behovForVeiledning = await fetchToJson(BEHOV_FOR_VEILEDNING_URL, requestConfig());
            if (behovForVeiledning) {
                settBehovForVeiledning(behovForVeiledning as BehovForVeiledningData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const lagreBehovForVeiledning = async (behovForVeiledningOppdatering: BehovForVeiledningValg) => {
        try {
            await fetchToJson(BEHOV_FOR_VEILEDNING_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ oppfolging: behovForVeiledningOppdatering }),
            });
            settBehovForVeiledning({
                dato: new Date().toISOString(),
                oppfolging: behovForVeiledningOppdatering,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        if (featureToggleData['veientilarbeid.bruk-klarer-seg-selv']) {
            hentBehovForVeiledning();
        }
    }, [featureToggleData]);

    const contextValue = {
        behovForVeiledning,
        lagreBehovForVeiledning,
    };

    return (
        <BehovForVeiledningContext.Provider value={contextValue}>{props.children}</BehovForVeiledningContext.Provider>
    );
}

function useBehovForVeiledning() {
    const context = useContext(BehovForVeiledningContext);

    if (context === undefined) {
        throw new Error('useBehovForVeiledning må brukes under en BehovForVeiledningProvider');
    }
    return context;
}

export { BehovForVeiledningProvider, useBehovForVeiledning };
