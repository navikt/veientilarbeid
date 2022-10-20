import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { fetchToJson } from '../ducks/api-utils';
import { BEHOV_FOR_VEILEDNING_URL, requestConfig } from '../ducks/api';
import { useFeatureToggleData } from './feature-toggles';

export type BehovForVeiledning = 'KLARE_SEG_SELV' | 'ONSKER_OPPFOLGING' | 'IKKE_BESVART';

interface BehovForVeiledningProviderType {
    behovForVeiledning: BehovForVeiledning;
    lagreBehovForVeiledning: (behovForVeiledning: BehovForVeiledning) => Promise<void>;
}

export const BehovForVeiledningContext = createContext<BehovForVeiledningProviderType>({
    behovForVeiledning: 'IKKE_BESVART',
    lagreBehovForVeiledning: () => Promise.resolve(),
});

function BehovForVeiledningProvider(props: { children: ReactNode }) {
    const [behovForVeiledning, settBehovForVeiledning] = useState<BehovForVeiledning>('IKKE_BESVART');
    const featureToggleData = useFeatureToggleData();

    const hentBehovForVeiledning = async () => {
        try {
            const behovForVeiledning = await fetchToJson(BEHOV_FOR_VEILEDNING_URL, requestConfig());
            if (behovForVeiledning) {
                settBehovForVeiledning(behovForVeiledning as BehovForVeiledning);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const lagreBehovForVeiledning = async (behovForVeiledningOppdatering: BehovForVeiledning) => {
        try {
            await fetchToJson(BEHOV_FOR_VEILEDNING_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ oppfolging: behovForVeiledningOppdatering }),
            });
            settBehovForVeiledning(behovForVeiledningOppdatering);
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
