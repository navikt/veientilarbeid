import { createContext, ReactNode, useContext, useState } from 'react';

import { fetchToJson } from '../ducks/api-utils';
import { GJELDER_FRA_DATO_URL, requestConfig } from '../ducks/api';

interface GjelderFraDatoProviderType {
    dato: string | null;
    lagreGjelderFraDato: (dato: string | null) => Promise<void>;
}

const GjelderFraDatoContext = createContext<GjelderFraDatoProviderType>({
    dato: null,
    lagreGjelderFraDato: () => Promise.resolve(),
});

function GjelderFraDatoProvider(props: { children: ReactNode }) {
    const [dato, settDato] = useState<string | null>(null);

    const hentGjelderFraDato = async () => {
        try {
            const { dato } = await fetchToJson<{ dato: string | null }>(GJELDER_FRA_DATO_URL, requestConfig());
            settDato(dato);
        } catch (err) {
            console.error(err);
        }
    };

    const lagreGjelderFraDato = async (dato: string | null) => {
        try {
            await fetchToJson(GJELDER_FRA_DATO_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ dato }),
            });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await hentGjelderFraDato();
        }
    };

    // TODO: Kommenter inn når vi begynner å bruke Gjelder fra datp
    // useEffect(() => {
    //     hentGjelderFraDato();
    // }, []);

    const contextValue = {
        dato,
        lagreGjelderFraDato,
    };

    return <GjelderFraDatoContext.Provider value={contextValue}>{props.children}</GjelderFraDatoContext.Provider>;
}

function useGjelderFraDato() {
    const context = useContext(GjelderFraDatoContext);

    if (context === undefined) {
        throw new Error('useGjelderFraDato må brukes under en GjelderFraDatoProvider');
    }

    return context;
}

export { GjelderFraDatoProvider, useGjelderFraDato };
