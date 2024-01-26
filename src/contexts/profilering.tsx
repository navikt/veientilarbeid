import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData, FeatureToggles } from './feature-toggles';
import { useArbeidssokerperioder } from './arbeidssokerperioder';

import { fetchToJson } from '../ducks/api-utils';
import { PROFILERING_URL, requestConfig } from '../ducks/api';
import { hentSisteArbeidssokerPeriode } from '../lib/hent-siste-arbeidssokerperiode';
import { ArbeidssokerperioderResponse } from '../models/arbeidssokerperiode';
import { ProfileringResponse } from '../models/profilering';

interface ProfileringProviderType {
    profilering: ProfileringResponse;
}

export const ProfileringContext = createContext<ProfileringProviderType>({
    profilering: [],
});

function ProfileringProvider(props: { children: ReactNode }) {
    const featureToggles = useFeatureToggleData();
    const { arbeidssokerperioder } = useArbeidssokerperioder();
    const [profilering, settProfilering] = useState<ProfileringResponse>([]);

    const erToggletPa = featureToggles[FeatureToggles.BRUK_OPPLYSNINGER_API];

    const hentProfilering = async (arbeidssokerperioder: ArbeidssokerperioderResponse) => {
        const { periodeId } = hentSisteArbeidssokerPeriode(arbeidssokerperioder);
        if (periodeId) {
            try {
                const urlForProfilering = `${PROFILERING_URL}/${periodeId}`;
                const oppdatertProfilering = await fetchToJson(urlForProfilering, requestConfig());
                if (oppdatertProfilering) {
                    settProfilering(oppdatertProfilering as ProfileringResponse);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (erToggletPa && arbeidssokerperioder) {
            hentProfilering(arbeidssokerperioder);
        }
    }, [erToggletPa, arbeidssokerperioder]);

    const contextValue = {
        profilering,
    };

    return <ProfileringContext.Provider value={contextValue}>{props.children}</ProfileringContext.Provider>;
}

function useProfilering() {
    const context = useContext(ProfileringContext);

    if (context === undefined) {
        throw new Error('useProfilering må brukes under en ProfileringProvider');
    }
    return context;
}

export { ProfileringProvider, useProfilering };
