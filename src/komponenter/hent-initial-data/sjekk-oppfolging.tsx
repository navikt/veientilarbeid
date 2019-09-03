import * as React from 'react';
import { redirectTilDittNav } from './redirect-dittnav-utils';
import { erMikrofrontend } from '../../utils/app-state-utils';
import InnholdLogikkNiva3 from '../../innhold/innhold-logikk-niva3';

interface SjekkOppfolgingConfig {
    sendBrukerTilDittNav: () => void;
}

interface OwnProps {
    config?: SjekkOppfolgingConfig;
    underOppfolging: boolean,
    children: React.ReactElement<any>;
}

const SjekkOppfolging = ({config = {sendBrukerTilDittNav: redirectTilDittNav}, underOppfolging, children}: OwnProps) => {
    if (!underOppfolging && erMikrofrontend()) {
        return <InnholdLogikkNiva3/>;
    }

    if (underOppfolging || erMikrofrontend()) {
        return children;
    }

    config!.sendBrukerTilDittNav();
    return null;
};

export default SjekkOppfolging;
