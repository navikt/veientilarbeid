import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData } from './feature-toggles';

import { fetchToJson } from '../ducks/api-utils';
import { PROFIL_URL, requestConfig } from '../ducks/api';

interface ProfilProviderType {
    profil: string | null;
    lagreProfil: (profil: string | null) => Promise<void>;
}

const ProfilContext = createContext<ProfilProviderType>({
    profil: null,
    lagreProfil: () => Promise.resolve(),
});

function ProfilProvider(props: { children: ReactNode }) {
    const [profil, settProfil] = useState<string | null>(null);
    const featureToggles = useFeatureToggleData();
    const skalBrukeProfil = featureToggles['veientilarbeid.bruk-profil'];

    const hentProfil = async () => {
        try {
            const { profil } = await fetchToJson(PROFIL_URL, requestConfig());
            settProfil(profil);
        } catch (err) {
            console.error(err);
        }
    };

    const lagreProfil = async (profil: string | null) => {
        try {
            await fetchToJson(PROFIL_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ profil }),
            });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await hentProfil();
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
