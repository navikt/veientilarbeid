import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { fetchToJson } from '../ducks/api-utils';
import { BEHOV_FOR_VEILEDNING_URL, OPPRETT_DIALOG_URL, requestConfig } from '../ducks/api';
import { ForeslattInnsatsgruppe } from './brukerregistrering';

export type BehovForVeiledningRequest = {
    oppfolging: ForeslattInnsatsgruppe;
    tekst?: string;
    overskrift?: string;
    settTilFerdigBehandlet?: boolean;
};

export type BehovForVeiledningResponse = {
    dato?: string;
    oppfolging: ForeslattInnsatsgruppe;
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

async function opprettDialog(data: {
    tekst?: string;
    overskrift?: string;
    settTilFerdigBehandlet?: boolean;
}): Promise<null | { id: string }> {
    if (!data.tekst && !data.overskrift) {
        return Promise.resolve(null);
    }

    const dialogUrl = data.settTilFerdigBehandlet ? `${OPPRETT_DIALOG_URL}/egenvurdering` : OPPRETT_DIALOG_URL;

    return fetchToJson(dialogUrl, {
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
            const behov: BehovForVeiledningResponse = await fetchToJson(BEHOV_FOR_VEILEDNING_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ oppfolging: data.oppfolging, dialogId: dialog?.id }),
            });
            settBehovForVeiledning(behov);
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
