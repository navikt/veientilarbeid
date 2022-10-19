import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { fetchToJson } from '../ducks/api-utils';
import { BEHOV_FOR_VEILEDNING_URL, requestConfig } from '../ducks/api';

export type BehovForVeiledning = 'KLARE_SEG_SELV' | 'ONSKER_OPPFOLGING' | 'IKKE_BESVART';

interface BehovForVeiledningProviderType {
    behovForVeiledning: BehovForVeiledning | null;
    lagreBehovForVeiledning: (behovForVeiledning: BehovForVeiledning) => Promise<void>;
}

export const BehovForVeiledningContext = createContext<BehovForVeiledningProviderType>({
    behovForVeiledning: null,
    lagreBehovForVeiledning: () => Promise.resolve(),
});

function BehovForVeiledningProvider(props: { children: ReactNode }) {
    const [behovForVeiledning, settBehovForVeiledning] = useState<BehovForVeiledning | null>(null);

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
            const lagretBehovForVeiledning =
                ((await fetchToJson(BEHOV_FOR_VEILEDNING_URL, requestConfig())) as BehovForVeiledning) || {};
            const behovForVeiledning = lagretBehovForVeiledning;

            await fetchToJson(BEHOV_FOR_VEILEDNING_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ oppfolging: behovForVeiledningOppdatering }),
            });
            settBehovForVeiledning(behovForVeiledning);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        hentBehovForVeiledning();
    }, []);

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
