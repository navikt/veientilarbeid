import * as React from 'react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';

type Props = {
    loggTekst: string;
};

function ErRendret(props: Props) {
    const amplitudeData = useAmplitudeData();

    React.useEffect(() => {
        loggAktivitet({ aktivitet: props.loggTekst, ...amplitudeData });
    }, [amplitudeData, props.loggTekst]);

    return <></>;
}

export default ErRendret;
