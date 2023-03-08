import { useEffect, useState } from 'react';
import handleViewport from 'react-in-viewport';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { loggAiAVisning } from '../../metrics/metrics';

interface ViewportProps {
    inViewport: boolean;
    forwardedRef: React.ForwardedRef<any>;
}

type Props = {
    loggTekst: string;
};

const WrappedViewport: React.ComponentType<Props> = handleViewport(AiAInViewport);

function AiAInViewport(props: Props & ViewportProps): JSX.Element {
    const [harVistTilBruker, setHarVistTilBruker] = useState<boolean>(false);
    const [harLoggetVisning, setHarLoggetVisning] = useState<boolean>(false);
    const { amplitudeData } = useAmplitudeData();

    if (props.inViewport && !harVistTilBruker) {
        setHarVistTilBruker(true);
    }

    useEffect(() => {
        if (harVistTilBruker && !harLoggetVisning) {
            loggAiAVisning({ viser: props.loggTekst, ...amplitudeData });
            setHarLoggetVisning(true);
        }
    }, [amplitudeData, harVistTilBruker, harLoggetVisning, props.loggTekst]);

    return <span ref={props.forwardedRef}></span>;
}

export default WrappedViewport;
