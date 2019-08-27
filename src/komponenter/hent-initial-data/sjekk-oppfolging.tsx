import * as React from 'react';
import { redirectTilDittNav } from './redirect-dittnav-utils';
import { erMikrofrontend } from '../../utils/app-state-utils';
import InnholdLogikkNiva3 from '../../innhold/innhold-logikk-niva3';
import { OppfolgingContext } from '../../ducks/oppfolging';

interface SjekkOppfolgingConfig {
    sendBrukerTilDittNav: () => void;
}

interface OwnProps {
    config?: SjekkOppfolgingConfig;
    children: React.ReactElement<any>;
}

const SjekkOppfolging = ({config = {sendBrukerTilDittNav: redirectTilDittNav}, children}: OwnProps) => {
    const underOppfolging = React.useContext(OppfolgingContext).data.underOppfolging;

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
