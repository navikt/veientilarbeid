import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { Data as OppfolgingData } from '../../ducks/oppfolging';
import { erUnderOppfolging, redirectTilDittNav } from './sjekk-oppfolging-utils';
import { InnloggingsInfo, InnloggingsInfoContext, InnloggingsNiva } from './autentiseringsInfoFetcher';
import { erMikrofrontend } from '../../utils/app-state-utils';

interface SjekkOppfolgingConfig {
    sendBrukerTilDittNav: () => void;
}

interface OwnProps {
    config?: SjekkOppfolgingConfig;
    children: React.ReactElement<any>;
}

interface StateProps {
    oppfolging: OppfolgingData;
}

type Props = OwnProps & StateProps;

const SjekkOppfolging = ({config = {sendBrukerTilDittNav: redirectTilDittNav}, oppfolging, children}: Props) => {

    const innloggingsInfo: InnloggingsInfo = React.useContext(InnloggingsInfoContext);

    const erPaDittNavPaNiva3 = () =>
        erMikrofrontend() &&
        innloggingsInfo.data.isLoggedIn &&
        innloggingsInfo.data.securityLevel === InnloggingsNiva.LEVEL_3;

    if (erUnderOppfolging(oppfolging) || erPaDittNavPaNiva3()) {
        return children;
    }

    config!.sendBrukerTilDittNav();
    return null;
};

const mapStateToProps = (state: AppState): StateProps => ({
        oppfolging: state.oppfolging.data
    }
);

export default connect(mapStateToProps)(SjekkOppfolging);