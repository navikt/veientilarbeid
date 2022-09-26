import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { fetchToJson } from '../ducks/api-utils';
import { PROFIL_URL, requestConfig } from '../ducks/api';
import { Profil } from '../profil';

interface ProfilProviderType {
    profil: Profil | null;
    lagreProfil: (profil: Profil) => Promise<void>;
}

export const ProfilContext = createContext<ProfilProviderType>({
    profil: null,
    lagreProfil: () => Promise.resolve(),
});

function ProfilProvider(props: { children: ReactNode }) {
    const [profil, settProfil] = useState<Profil | null>(null);

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

    const lagreProfil = async (profilOppdateringer: Profil) => {
        try {
            const lagretProfil = ((await fetchToJson(PROFIL_URL, requestConfig())) as Profil) || {};
            const profil = { ...lagretProfil, ...profilOppdateringer };

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
        hentProfil();
    }, []);

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
