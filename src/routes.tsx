import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import StartFraSykefravaer from './komponenter/start-fra-sykefravaer/start-fra-sykefravaer';
import SjekkOppfolging from './komponenter/hent-initial-data/sjekk-oppfolging';
import { connect } from 'react-redux';
import { AppState } from './reducer';
import { selectSykeforloepMetadata, State as SykeforloepMetadataState } from './ducks/sykeforloep-metadata';
import Startside from './komponenter/startside/startside';
import SykemeldingOppfolgingInnhold from './komponenter/start-fra-sykefravaer/innhold-sykmelding/innhold-sykmelding';

interface StateProps {
    sykeforloepMetadata: SykeforloepMetadataState;
}

class Routes extends React.Component<StateProps> {
    render() {
        // TODO: Bytt verdi når beregning av gjenstående sykedager er på plass
        const erSykemeldt = this.props.sykeforloepMetadata.data!.erArbeidsrettetOppfolgingSykmeldtInngangAktiv;

        // TODO sjekk også på oppfolgingsflag + legg til routes.test
        if (erSykemeldt) {
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
});

export default connect(mapStateToProps, null, null, {pure: false})(Routes);
