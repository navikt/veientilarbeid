import { useEffect, useState } from 'react';

import { useAutentiseringData, InnloggingsNiva } from '../../contexts/autentisering';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import * as Sakstema from '../../contexts/sakstema';

import kanViseDpStatus from '../../lib/kan-vise-dp-status';
import { fetchData } from '../../ducks/api-utils';
import { SAKSTEMA_URL } from '../../ducks/api';

export const SakstemaProvider = (props: { children: React.ReactNode }) => {
    const [sakstemaState, setSakstemaState] = useState<Sakstema.State>(Sakstema.initialState);
    const { securityLevel } = useAutentiseringData();
    const amplitudeData = useAmplitudeData();
    const brukerInfoData = useBrukerinfoData();
    const featuretoggleData = useFeatureToggleData();
    const oppfolgingData = useOppfolgingData();
    const registreringData = useBrukerregistreringData();

    const oppdaterDpStatus = kanViseDpStatus({
        amplitudeData,
        brukerInfoData,
        featuretoggleData,
        oppfolgingData,
        registreringData,
    });

    useEffect(() => {
        if (securityLevel !== InnloggingsNiva.LEVEL_4) {
            return;
        }
        if (oppdaterDpStatus) {
            fetchData<Sakstema.State, Sakstema.Data>(sakstemaState, setSakstemaState, SAKSTEMA_URL);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oppdaterDpStatus, securityLevel]);

    return (
        <Sakstema.SakstemaContext.Provider value={sakstemaState}>{props.children}</Sakstema.SakstemaContext.Provider>
    );
};
