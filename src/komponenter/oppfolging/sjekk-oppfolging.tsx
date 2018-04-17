import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { Data as OppfolgingData, selectOppfolging } from '../../ducks/oppfolging';
import {
    erUnderOppfolging, harTattIBrukAktivitetsplan, sendBrukerTilAktivitetsplan,
    sendBrukerTilDittNav
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
            sendBrukerTilAktivitetsplan: sendBrukerTilAktivitetsplan,
            sendBrukerTilDittNav: sendBrukerTilDittNav,
        }
    };

    render() {
        const {oppfolging, children, config} = this.props;

        if (erUnderOppfolging(oppfolging)) {
            return children;
        }
        if (harTattIBrukAktivitetsplan(oppfolging)) {
            config!.sendBrukerTilAktivitetsplan();
            return null;
        }

        config!.sendBrukerTilDittNav();
        return null;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
        oppfolging: selectOppfolging(state).data
    }
);

// tslint:disable-next-line:no-any
export default connect(mapStateToProps)(SjekkOppfolging as any);