import { createContext, ReactNode, useEffect, useState } from 'react';
import { InnloggingsNiva, useAutentiseringData } from './autentisering';
import { DAGPENGER_STATUS, requestConfig } from '../ducks/api';
import { fetchToJson } from '../ducks/api-utils';
import { DagpengeStatus } from '../lib/beregn-dagpenge-status';
import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';

type DagpengerStatus = DagpengeStatus;
type AntallDagerSidenDagpengerStanset = number | 'N/A';

type DagpengerStatusResponse = {
    dagpengerStatus: DagpengerStatus;
    antallDagerSidenDagpengerStanset: AntallDagerSidenDagpengerStanset;
};

interface DagpengerStatusProviderType {
    dagpengerStatus: DagpengerStatus | null;
}

export const DagpengerStatusContext = createContext<DagpengerStatusProviderType>({
    dagpengerStatus: null,
});

function DagpengerStatusProvider(props: { children: ReactNode }) {
    const { securityLevel } = useAutentiseringData();
    const { oppdaterAmplitudeData } = useAmplitudeData();

    const [dagpengerStatus, settDagpengerStatus] = useState<DagpengerStatus | null>(null);

    useEffect(() => {
        const hentDagpengerStatus = async () => {
            try {
                const response: DagpengerStatusResponse = await fetchToJson(DAGPENGER_STATUS, requestConfig());
                settDagpengerStatus(response.dagpengerStatus);
                oppdaterAmplitudeData({
                    dagpengerStatus: response.dagpengerStatus,
                    antallDagerSidenDagpengerStanset: response.antallDagerSidenDagpengerStanset,
                });
            } catch (err) {}
        };
        if (securityLevel === InnloggingsNiva.LEVEL_4) {
            hentDagpengerStatus();
        }
    }, [securityLevel]);

    const contextValue = {
        dagpengerStatus,
    };

    return <DagpengerStatusContext.Provider value={contextValue}>{props.children}</DagpengerStatusContext.Provider>;
}

export { DagpengerStatusProvider };
