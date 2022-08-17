import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData } from './feature-toggles';

import { fetchToJson } from '../ducks/api-utils';
import { PROFIL_URL, requestConfig } from '../ducks/api';
import { Profil } from '../profil';

interface ProfilProviderType {
    profil: Profil | null;
    lagreProfil: (profil: Profil | null) => Promise<void>;
}

const ProfilContext = createContext<ProfilProviderType>({
    profil: null,
    lagreProfil: () => Promise.resolve(),
});

function ProfilProvider(props: { children: ReactNode }) {
    const [profil, settProfil] = useState<Profil | null>(null);
    const featureToggles = useFeatureToggleData();
    const skalBrukeProfil = featureToggles['veientilarbeid.bruk-profil'];

    const hentProfil = async () => {
        try {
            const profil = await fetchToJson(PROFIL_URL, requestConfig());
            if (profil) {
                settProfil(profil as Profil);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const lagreProfil = async (profil: Profil | null) => {
        try {
            await fetchToJson(PROFIL_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ ...profil }),
            });
            settProfil(profil);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        if (skalBrukeProfil) {
            hentProfil();
        }
    }, [skalBrukeProfil]);

    const contextValue = {
        profil,
        lagreProfil,
    };

    return <ProfilContext.Provider value={contextValue}>{props.children}</ProfilContext.Provider>;
}

function useProfil() {
    const context = useContext(ProfilContext);

    if (context === undefined) {
        throw new Error('useProfil må brukes under en ProfilProvider');
    }

    return context;
}

export { ProfilProvider, useProfil };
