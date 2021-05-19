import * as React from 'react';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';

type Props = {
    loggTekst: string;
};

function ErRendret(props: Props) {
    const amplitudeData = React.useContext(AmplitudeContext);

    React.useEffect(() => {
        loggAktivitet({ aktivitet: props.loggTekst, ...amplitudeData });
    }, []);

    return <></>;
}

export default ErRendret;
