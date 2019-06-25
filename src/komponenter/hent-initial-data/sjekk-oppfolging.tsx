import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { redirectTilDittNav } from './redirect-dittnav-utils';
import { erMikrofrontend } from '../../utils/app-state-utils';

interface SjekkOppfolgingConfig {
    sendBrukerTilDittNav: () => void;
}

interface OwnProps {
    config?: SjekkOppfolgingConfig;
    children: React.ReactElement<any>;
}

interface StateProps {
    underOppfolging: boolean;
}

type Props = OwnProps & StateProps;

const SjekkOppfolging = ({config = {sendBrukerTilDittNav: redirectTilDittNav}, underOppfolging, children}: Props) => {

    if (underOppfolging || erMikrofrontend()) {
        return children;
    }

    config!.sendBrukerTilDittNav();
    return null;
};

const mapStateToProps = (state: AppState): StateProps => ({
        underOppfolging: state.oppfolging.data.underOppfolging,
    }
);

export default connect(mapStateToProps)(SjekkOppfolging);