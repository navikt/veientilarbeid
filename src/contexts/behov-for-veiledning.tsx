import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { fetchToJson } from '../ducks/api-utils';
import { BEHOV_FOR_VEILEDNING_URL, OPPRETT_DIALOG_URL, requestConfig } from '../ducks/api';
import { useFeatureToggleData } from './feature-toggles';

export type BehovForVeiledningValg = 'KLARE_SEG_SELV' | 'ONSKER_OPPFOLGING' | 'IKKE_BESVART';
export type BehovForVeiledningRequest = {
    oppfolging: BehovForVeiledningValg;
    tekst?: string;
    overskrift?: string;
};
export type BehovForVeiledningResponse = {
    dato?: string;
    oppfolging: BehovForVeiledningValg;
    dialogId?: string;
} | null;

interface BehovForVeiledningProviderType {
    behovForVeiledning: BehovForVeiledningResponse;
    lagreBehovForVeiledning: (behovForVeiledning: BehovForVeiledningRequest) => Promise<void>;
}

export const BehovForVeiledningContext = createContext<BehovForVeiledningProviderType>({
    behovForVeiledning: null,
    lagreBehovForVeiledning: () => Promise.resolve(),
});

async function opprettDialog(data: { tekst?: string; overskrift?: string }): Promise<null | { id: string }> {
    if (!data.tekst && !data.overskrift) {
        return Promise.resolve(null);
    }

    return fetchToJson(OPPRETT_DIALOG_URL, {
        ...requestConfig(),
        method: 'POST',
        body: JSON.stringify({
            tekst: data.tekst,
            overskrift: data.overskrift,
        }),
    });
}
function BehovForVeiledningProvider(props: { children: ReactNode }) {
    const [behovForVeiledning, settBehovForVeiledning] = useState<BehovForVeiledningResponse>(null);
    const featureToggleData = useFeatureToggleData();

    const hentBehovForVeiledning = async () => {
        try {
            const behovForVeiledning = await fetchToJson(BEHOV_FOR_VEILEDNING_URL, requestConfig());
            if (behovForVeiledning) {
                settBehovForVeiledning(behovForVeiledning as BehovForVeiledningResponse);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const lagreBehovForVeiledning = async (data: BehovForVeiledningRequest) => {
        try {
            const dialog = await opprettDialog(data);
            settBehovForVeiledning(
                await fetchToJson(BEHOV_FOR_VEILEDNING_URL, {
                    ...requestConfig(),
                    method: 'POST',
                    body: JSON.stringify({ oppfolging: data.oppfolging, dialogId: dialog?.id }),
                })
            );
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
