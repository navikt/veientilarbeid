import * as React from 'react';

import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';

import { loggRendring } from '../metrics/metrics';
import { hotjarTriggerEvent } from '../hotjar';

type Props = {};

export default function InnholdMetrics() {
    const { securityLevel } = useAutentiseringData();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;

    if (!underOppfolging || securityLevel === InnloggingsNiva.LEVEL_3) return null;

    return <Metrics />;
}

function Metrics(props: Props) {
    const { amplitudeData } = useAmplitudeData();

    React.useEffect(() => {
        hotjarTriggerEvent('aia-hotjar');
        loggRendring({ rendrer: 'AiA', ...amplitudeData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
