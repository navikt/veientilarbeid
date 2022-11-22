import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { FeatureToggles, useFeatureToggleData } from './feature-toggles';
import { useAmplitudeData } from './amplitude-context';
import { InnloggingsNiva, useAutentiseringData } from './autentisering';
import { DAGPENGER_STATUS, requestConfig } from '../ducks/api';
import { fetchToJson } from '../ducks/api-utils';
import { DagpengeStatus } from '../lib/beregn-dagpenge-status';

type DagpengerStatus = DagpengeStatus;

interface DagpengerStatusProviderType {
    dagpengerStatus: DagpengerStatus | null;
}

export const DagpengerStatusContext = createContext<DagpengerStatusProviderType>({
    dagpengerStatus: null,
});

function DagpengerStatusProvider(props: { children: ReactNode }) {
    const featureToggleData = useFeatureToggleData();
    const { securityLevel } = useAutentiseringData();
    const { oppdaterAmplitudeData } = useAmplitudeData();
    const brukDagpengerStatus = featureToggleData[FeatureToggles.BRUK_DAGPENGER_STATUS];

    const [dagpengerStatus, settDagpengerStatus] = useState<DagpengerStatus | null>(null);

    useEffect(() => {
        const hentDagpengerStatus = async () => {
            try {
                const dpStatus: DagpengerStatus = await fetchToJson(DAGPENGER_STATUS, requestConfig());
                settDagpengerStatus(dpStatus);
                oppdaterAmplitudeData({
                    dagpengerStatus: dpStatus,
                });
            } catch (err) {}
        };
        if (brukDagpengerStatus && securityLevel === InnloggingsNiva.LEVEL_4) {
            hentDagpengerStatus();
        }
    }, [brukDagpengerStatus, securityLevel]);

    const contextValue = {
        dagpengerStatus,
    };

    return <DagpengerStatusContext.Provider value={contextValue}>{props.children}</DagpengerStatusContext.Provider>;
}

function useDagpengerStatus() {
    const context = useContext(DagpengerStatusContext);

    if (context === undefined) {
        throw new Error('useMeldeplikt må brukes under en MeldepliktProvider');
    }

    return context;
}

export { DagpengerStatusProvider, useDagpengerStatus };
