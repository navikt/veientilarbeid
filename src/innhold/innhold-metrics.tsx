import * as React from 'react';

import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';
import { useFeatureToggleData, FeatureToggles } from '../contexts/feature-toggles';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';

import { loggRendring } from '../metrics/metrics';
import { hotjarTrigger } from '../hotjar';

type Props = {};

export default function InnholdMetrics() {
    const { securityLevel } = useAutentiseringData();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;

    if (!underOppfolging || securityLevel === InnloggingsNiva.LEVEL_3) return null;

    return <Metrics />;
}

function Metrics(props: Props) {
    const { amplitudeData } = useAmplitudeData();
    const featureToggles = useFeatureToggleData();

    const hotjarErToggletPaa = featureToggles[FeatureToggles.BRUK_HOTJAR] || false;

    const hotjarKriterierErOppfylt = (): boolean => {
        // Her legges kriterier om du vil bruke HotJar mot en gitt brukergruppe
        return true;
    };

    const brukHotJar = hotjarErToggletPaa && hotjarKriterierErOppfylt();

    React.useEffect(() => {
        hotjarTrigger(brukHotJar);
        loggRendring({ rendrer: 'AiA', ...amplitudeData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
