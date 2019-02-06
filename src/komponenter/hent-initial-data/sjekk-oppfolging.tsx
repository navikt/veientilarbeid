import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { Data as OppfolgingData } from '../../ducks/oppfolging';
import {
    erUnderOppfolging, redirectTilAktivitetsplan, redirectTilDittNav
} from './sjekk-oppfolging-utils';

interface SjekkOppfolgingConfig {
    sendBrukerTilAktivitetsplan: () => void;
    sendBrukerTilDittNav: () => void;
}

interface OwnProps {
    config?: SjekkOppfolgingConfig;
}

interface StateProps {
    oppfolging: OppfolgingData;
}

type Props = OwnProps & StateProps;

class SjekkOppfolging extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        config: {
            sendBrukerTilAktivitetsplan: redirectTilAktivitetsplan,
            sendBrukerTilDittNav: redirectTilDittNav,
        }
    };

    render() {
        const {oppfolging, children, config} = this.props;

        if (erUnderOppfolging(oppfolging)) {
            return children;
        }

        config!.sendBrukerTilAktivitetsplan();
        return null;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
        oppfolging: state.oppfolging.data
    }
);

// tslint:disable-next-line:no-any
export default connect(mapStateToProps)(SjekkOppfolging);