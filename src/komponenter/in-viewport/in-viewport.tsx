import * as React from 'react';
import handleViewport from 'react-in-viewport';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { loggVisning } from '../../metrics/metrics';

interface ViewportProps {
    inViewport: boolean;
    forwardedRef: React.ForwardedRef<any>;
}

type Props = {
    loggTekst: string;
};

const WrappedViewport: React.ComponentType<Props> = handleViewport(InViewport);

function InViewport(props: Props & ViewportProps) {
    const [harVistTilBruker, setHarVistTilBruker] = React.useState<boolean>(false);
    const amplitudeData = React.useContext(AmplitudeContext);

    if (props.inViewport && !harVistTilBruker) {
        setHarVistTilBruker(true);
    }

    React.useEffect(() => {
        if (harVistTilBruker) {
            loggVisning({ viser: props.loggTekst, ...amplitudeData });
        }
    }, [amplitudeData, harVistTilBruker, props.loggTekst]);

    return <span ref={props.forwardedRef}></span>;
}

export default WrappedViewport;