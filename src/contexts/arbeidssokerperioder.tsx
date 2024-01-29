import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData, FeatureToggles } from './feature-toggles';

import { fetchToJson } from '../ducks/api-utils';
import { ARBEIDSOKERPERIODER_URL, requestConfig } from '../ducks/api';
import { ArbeidssokerperioderResponse } from '@navikt/arbeidssokerregisteret-utils';

interface ArbeidssokerperioderProviderType {
    arbeidssokerperioder: ArbeidssokerperioderResponse;
}

export const ArbeidssokerperioderContext = createContext<ArbeidssokerperioderProviderType>({
    arbeidssokerperioder: [],
});

function ArbeidssokerperioderProvider(props: { children: ReactNode }) {
    const featureToggles = useFeatureToggleData();
    const [arbeidssokerperioder, settArbeidssokerperioder] = useState<ArbeidssokerperioderResponse>([]);

    const erToggletPa = featureToggles[FeatureToggles.BRUK_OPPLYSNINGER_API];

    const hentArbeidssokerperioder = async () => {
        try {
            const oppdaterteArbeidssokerperioder = await fetchToJson(ARBEIDSOKERPERIODER_URL, requestConfig());
            if (oppdaterteArbeidssokerperioder) {
                settArbeidssokerperioder(oppdaterteArbeidssokerperioder as ArbeidssokerperioderResponse);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (erToggletPa) {
            hentArbeidssokerperioder();
        }
    }, [erToggletPa]);

    const contextValue = {
        arbeidssokerperioder,
    };

    return (
        <ArbeidssokerperioderContext.Provider value={contextValue}>
            {props.children}
        </ArbeidssokerperioderContext.Provider>
    );
}

function useArbeidssokerperioder() {
    const context = useContext(ArbeidssokerperioderContext);

    if (context === undefined) {
        throw new Error('useArbeidssokerperioder må brukes under en ArbeidssokerperioderProvider');
    }
    return context;
}

export { ArbeidssokerperioderProvider, useArbeidssokerperioder };
