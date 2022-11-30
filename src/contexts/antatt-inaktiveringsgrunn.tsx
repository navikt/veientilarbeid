import { createContext, ReactNode, useEffect, useState } from 'react';
import { InnloggingsNiva, useAutentiseringData } from './autentisering';
import { fetchToJson } from '../ducks/api-utils';
import { ANTATT_INAKTIVERINGSGRUNN, requestConfig } from '../ducks/api';
import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';

export type AntattInaktiveringsgrunn =
    | 'INGEN_INNSENDT'
    | 'SVART_NEI'
    | 'MANGLER_INNSENDING'
    | 'FOR_SEN_INNSENDING'
    | 'N/A';

type AntattInaktiveringsgrunnResonse = {
    meldekortStatus: AntattInaktiveringsgrunn;
};

interface AntattInaktiveringsgrunnProviderType {
    antattInaktiveringsgrunn: AntattInaktiveringsgrunn | null;
}

export const AntattInaktiveringsgrunnContext = createContext<AntattInaktiveringsgrunnProviderType>({
    antattInaktiveringsgrunn: null,
});

function AntattInaktiveringsgrunnProvider(props: { children: ReactNode }) {
    const { securityLevel } = useAutentiseringData();
    const { oppdaterAmplitudeData } = useAmplitudeData();

    const [antattInaktiveringsgrunn, settAntattInaktiveringsgrunn] = useState<AntattInaktiveringsgrunn | null>(null);

    useEffect(() => {
        const hentAntattInaktiveringsgrunn = async () => {
            try {
                const response: AntattInaktiveringsgrunnResonse = await fetchToJson(
                    ANTATT_INAKTIVERINGSGRUNN,
                    requestConfig()
                );
                settAntattInaktiveringsgrunn(response.meldekortStatus);
                oppdaterAmplitudeData({
                    antattInaktiveringsgrunn: response.meldekortStatus,
                });
            } catch (err) {
                console.error(err);
            }
        };

        if (securityLevel === InnloggingsNiva.LEVEL_4) {
            hentAntattInaktiveringsgrunn();
        }
    }, [securityLevel]);

    const contextValue = {
        antattInaktiveringsgrunn,
    };

    return (
        <AntattInaktiveringsgrunnContext.Provider value={contextValue}>
            {props.children}
        </AntattInaktiveringsgrunnContext.Provider>
    );
}

export { AntattInaktiveringsgrunnProvider };
