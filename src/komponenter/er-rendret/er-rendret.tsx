import { useEffect } from 'react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { loggRendring } from '../../metrics/metrics';

type Props = {
    loggTekst: string;
};

function ErRendret(props: Props) {
    function loggTilAmplitude() {
        const { amplitudeData } = useAmplitudeData();
        loggRendring({ rendrer: props.loggTekst, ...amplitudeData });
    }

    useEffect(() => {
        setTimeout(loggTilAmplitude, 2000);
    }, []);

    return null;
}

export default ErRendret;
