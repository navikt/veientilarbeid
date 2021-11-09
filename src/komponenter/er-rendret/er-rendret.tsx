import * as React from 'react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggRendring } from '../../metrics/metrics';

type Props = {
    loggTekst: string;
};

function ErRendret(props: Props) {
    const amplitudeData = useAmplitudeData();

    React.useEffect(() => {
        loggRendring({ rendrer: props.loggTekst, ...amplitudeData });
    }, [amplitudeData, props.loggTekst]);

    return <></>;
}

export default ErRendret;
