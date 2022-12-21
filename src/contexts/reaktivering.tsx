import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData, FeatureToggles } from './feature-toggles';

import { fetchToJson } from '../ducks/api-utils';
import { REAKTIVERING_URL, requestConfig } from '../ducks/api';
import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';

export type Reaktivering = {
    opprettetDato: string;
    svar: ReaktiveringSvar | null;
};

type ReaktiveringSvar = { opprettetDato: string; svar: ReaktiveringSvarAlternativer };

export type ReaktiveringSvarAlternativer = 'ja' | 'nei';

interface ReaktiveringProviderType {
    reaktivering: Reaktivering | null;
    lagreReaktiveringSvar: (svar: ReaktiveringSvarAlternativer) => Promise<void>;
}

export const ReaktiveringContext = createContext<ReaktiveringProviderType>({
    reaktivering: null,
    lagreReaktiveringSvar: () => Promise.resolve(),
});

function ReaktiveringProvider(props: { children: ReactNode }) {
    const [reaktivering, settReaktivering] = useState<Reaktivering | null>(null);
    const featureToggles = useFeatureToggleData();
    const { oppdaterAmplitudeData } = useAmplitudeData();

    const hentReaktivering = async () => {
        try {
            const reaktivering = await fetchToJson(REAKTIVERING_URL, requestConfig());
            if (reaktivering) {
                const r = reaktivering as Reaktivering;
                settReaktivering(r);
                oppdaterAmplitudeData({
                    automatiskReaktivert: 'Ja',
                    automatiskReaktivertSvar: r.svar === null ? 'Ikke svart' : r.svar!.svar,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const lagreReaktiveringSvar = async (svar: ReaktiveringSvarAlternativer) => {
        try {
            const lagretReaktivering = ((await fetchToJson(REAKTIVERING_URL, requestConfig())) as Reaktivering) || {};
            if (lagretReaktivering) {
                const reaktiveringSvar = {
                    svar: {
                        opprettetDato: new Date().toISOString(),
                        svar: svar as ReaktiveringSvarAlternativer,
                    },
                };

                const oppdatertReaktiveringSvar = { ...lagretReaktivering, ...reaktiveringSvar };

                await fetchToJson(REAKTIVERING_URL, {
                    ...requestConfig(),
                    method: 'POST',
                    body: JSON.stringify({ svar: svar }),
                });

                settReaktivering(oppdatertReaktiveringSvar);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        if (featureToggles[FeatureToggles.BRUK_BEKREFT_REAKTIVERING]) {
            hentReaktivering();
        }
    }, [featureToggles]);

    const contextValue = {
        reaktivering,
        lagreReaktiveringSvar,
    };

    return <ReaktiveringContext.Provider value={contextValue}>{props.children}</ReaktiveringContext.Provider>;
}

function useReaktivering() {
    const context = useContext(ReaktiveringContext);

    if (context === undefined) {
        throw new Error('useReaktivering må brukes under en ReaktiveringProvider');
    }

    return context;
}

export { ReaktiveringProvider, useReaktivering };
