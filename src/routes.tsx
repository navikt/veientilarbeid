import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import SjekkOppfolging from './komponenter/hent-initial-data/sjekk-oppfolging';
import { connect } from 'react-redux';
import { AppState } from './reducer';
import { selectSykeforloepMetadata, State as SykeforloepMetadataState } from './ducks/sykeforloep-metadata';
import Startside from './sider/startside/startside';
import StartFraSykefravaer from './sider/start-fra-sykefravaer/start-fra-sykefravaer';
import SykemeldingOppfolgingInnhold from './komponenter/start-fra-sykefravaer/innhold-sykmelding/innhold-sykmelding';
import { selectOppfolging, Data as OppfolgingData } from './ducks/oppfolging';
import { erUnderOppfolging } from './komponenter/hent-initial-data/sjekk-oppfolging-utils';

interface StateProps {
    sykeforloepMetadata: SykeforloepMetadataState;
    oppfolging: OppfolgingData;
}

class Routes extends React.Component<StateProps> {
    render() {
        // TODO: Bytt verdi når beregning av gjenstående sykedager er på plass
        const erSykemeldt = this.props.sykeforloepMetadata.data!.erArbeidsrettetOppfolgingSykmeldtInngangAktiv;
        const { oppfolging } = this.props;

        if (erSykemeldt && erUnderOppfolging(oppfolging)) {
            return (
                <Switch>
                    <Route path="/" exact={true} component={StartFraSykefravaer}/>
                    <Route path="/oppfolging" component={SykemeldingOppfolgingInnhold}/>
                    <Redirect to="/"/>
                </Switch>
            );
        } else {
            return (
                <SjekkOppfolging>
                    <Route path="/" exact={true} component={Startside}/>
                    <Redirect to="/"/>
                </SjekkOppfolging>
            );
        }
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykeforloepMetadata: selectSykeforloepMetadata(state),
    oppfolging: selectOppfolging(state).data
});

export default connect(mapStateToProps, null, null, {pure: false})(Routes);
