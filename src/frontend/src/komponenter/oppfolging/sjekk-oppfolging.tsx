import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import {Data as OppfolgingData, selectOppfolging } from '../../ducks/oppfolging';
import {
    erUnderOppfolging, harTattIBrukAktivitetsplan, sendBrukerTilAktivitetsplan,
    sendBrukerTilDittNav
} from './sjekk-oppfolging-utils';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingData;
}

type Props = OwnProps & StateProps;

function SjekkOppfolging({oppfolging, children}: Props) {
    if (erUnderOppfolging(oppfolging)) {
        return children;
    }
    if (harTattIBrukAktivitetsplan(oppfolging)) {
        sendBrukerTilAktivitetsplan();
        return null;
    }

    sendBrukerTilDittNav();
    return null;
}

const mapStateToProps = (state: AppState): StateProps => ({
        oppfolging: selectOppfolging(state).data
    }
);

// tslint:disable-next-line:no-any
export default connect(mapStateToProps)(SjekkOppfolging as any);