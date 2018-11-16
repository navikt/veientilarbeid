import * as React from 'react';
import SjekkOppfolging from './komponenter/hent-initial-data/sjekk-oppfolging';
import { connect } from 'react-redux';
import { AppState } from './reducer';
import { selectSykeforloepMetadata, State as SykeforloepMetadataState } from './ducks/sykeforloep-metadata';
import { selectOppfolging, Data as OppfolgingData } from './ducks/oppfolging';
import { erUnderOppfolging } from './komponenter/hent-initial-data/sjekk-oppfolging-utils';
import StartsideSykmeldt from './sider/startside-sykmeldt/startside-sykmeldt';
import StartsideOrdinaer from './sider/startside-ordinaer/startside-ordinaer';
import FullfortRegistreringSykmeldt from './sider/fullfort-registrering-sykmeldt/fullfort-registrering-sykmeldt';
import { Redirect, Route, Switch } from 'react-router';

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
                    <Route path="/" exact={true} component={StartsideSykmeldt}/>
                    <Route path="/fullfort-registrering" component={FullfortRegistreringSykmeldt}/>
                    <Redirect to="/"/>
                </Switch>
            );
        } else {
            return (
                <SjekkOppfolging>
                    <Route path="/" exact={true} component={StartsideOrdinaer}/>
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
