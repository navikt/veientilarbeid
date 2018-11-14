import * as React from 'react';
import { Route } from 'react-router';
import Startside from './komponenter/startside/startside';
import StartFraSykefravaer from './komponenter/start-fra-sykefravaer/start-fra-sykefravaer';
import SjekkOppfolging from './komponenter/hent-initial-data/sjekk-oppfolging';
import { connect } from 'react-redux';
import { AppState } from './reducer';
import { selectSykeforloepMetadata, State as SykeforloepMetadataState } from './ducks/sykeforloep-metadata';

interface StateProps {
    sykeforloepMetadata: SykeforloepMetadataState;
}

class Routes extends React.Component<StateProps> {
    render() {
        // TODO: Bytt verdi når beregning av gjenstående sykedager er på plass
        const erSykemeldt = this.props.sykeforloepMetadata.data!.erArbeidsrettetOppfolgingSykmeldtInngangAktiv;

        if (erSykemeldt) {
            return <Route path="/" component={StartFraSykefravaer}/>;
        } else {
            return (
                <SjekkOppfolging>
                    <Route path="/" component={Startside}/>
                </SjekkOppfolging>
            );
        }
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykeforloepMetadata: selectSykeforloepMetadata(state),
});

export default connect(mapStateToProps, null, null, {pure: false})(Routes);
