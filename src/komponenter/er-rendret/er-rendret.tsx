import { useEffect } from 'react';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggRendring } from '../../metrics/metrics';

type Props = {
    loggTekst: string;
};

function ErRendret(props: Props) {
    const { amplitudeData } = useAmplitudeData();

    useEffect(() => {
        loggRendring({ rendrer: props.loggTekst, ...amplitudeData });
    }, [amplitudeData, props.loggTekst]);

    return null;
}

export default ErRendret;
