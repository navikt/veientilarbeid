import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData, FeatureToggles } from './feature-toggles';
import { useArbeidssokerperioder } from './arbeidssokerperioder';

import { fetchToJson } from '../ducks/api-utils';
import { OPPLYSNINGER_OM_ARBEIDSSOKER_URL, requestConfig } from '../ducks/api';
import { hentSisteArbeidssokerPeriode } from '../lib/hent-siste-arbeidssokerperiode';
import { ArbeidssokerperioderResponse } from '../models/arbeidssokerperiode';
import { OpplysningerOmArbeidssokerResponse } from '../models/opplysninger-om-arbeidssoker';

interface OpplysningerOmArbeidssokerProviderType {
    opplysningerOmArbeidssoker: OpplysningerOmArbeidssokerResponse;
}

export const OpplysningerOmArbeidssokerContext = createContext<OpplysningerOmArbeidssokerProviderType>({
    opplysningerOmArbeidssoker: [],
});

function OpplysningerOmArbeidssokerProvider(props: { children: ReactNode }) {
    const featureToggles = useFeatureToggleData();
    const { arbeidssokerperioder } = useArbeidssokerperioder();
    const [opplysningerOmArbeidssoker, settOpplysningerOmArbeidssoker] = useState<OpplysningerOmArbeidssokerResponse>(
        [],
    );

    const erToggletPa = featureToggles[FeatureToggles.BRUK_OPPLYSNINGER_API];

    const hentOpplysningerOmArbeidssoker = async (arbeidssokerperioder: ArbeidssokerperioderResponse) => {
        const { periodeId } = hentSisteArbeidssokerPeriode(arbeidssokerperioder);
        if (periodeId) {
            try {
                const urlForOppdaterteOpplysningerOmArbeidssoker = `${OPPLYSNINGER_OM_ARBEIDSSOKER_URL}/${periodeId}`;
                const oppdaterteOpplysningerOmArbeidssoker = await fetchToJson(
                    urlForOppdaterteOpplysningerOmArbeidssoker,
                    requestConfig(),
                );
                if (oppdaterteOpplysningerOmArbeidssoker) {
                    settOpplysningerOmArbeidssoker(
                        oppdaterteOpplysningerOmArbeidssoker as OpplysningerOmArbeidssokerResponse,
                    );
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (erToggletPa && arbeidssokerperioder) {
            hentOpplysningerOmArbeidssoker(arbeidssokerperioder);
        }
    }, [erToggletPa, arbeidssokerperioder]);

    const contextValue = {
        opplysningerOmArbeidssoker,
    };

    return (
        <OpplysningerOmArbeidssokerContext.Provider value={contextValue}>
            {props.children}
        </OpplysningerOmArbeidssokerContext.Provider>
    );
}

function useOpplysningerOmArbeidssoker() {
    const context = useContext(OpplysningerOmArbeidssokerContext);

    if (context === undefined) {
        throw new Error('useOpplysningerOmArbeidssoker må brukes under en OpplysningerOmArbeidssokerProvider');
    }
    return context;
}

export { OpplysningerOmArbeidssokerProvider, useOpplysningerOmArbeidssoker };
