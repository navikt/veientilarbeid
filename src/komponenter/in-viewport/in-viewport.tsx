import { useEffect, useState } from 'react';
import handleViewport from 'react-in-viewport';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { loggVisning } from '../../metrics/metrics';

interface ViewportProps {
    inViewport: boolean;
    forwardedRef: React.ForwardedRef<any>;
}

type Props = {
    loggTekst: string;
};

const WrappedViewport: React.ComponentType<Props> = handleViewport(InViewport);

function InViewport(props: Props & ViewportProps): JSX.Element {
    const [harVistTilBruker, setHarVistTilBruker] = useState<boolean>(false);
    const { amplitudeData } = useAmplitudeData();

    if (props.inViewport && !harVistTilBruker) {
        setHarVistTilBruker(true);
    }

    function loggTilAmplitude() {
        if (harVistTilBruker) {
            loggVisning({ viser: props.loggTekst, ...amplitudeData });
        }
    }

    useEffect(() => {
        setTimeout(loggTilAmplitude, 2000);
    }, []);

    return <span ref={props.forwardedRef}></span>;
}

export default WrappedViewport;
