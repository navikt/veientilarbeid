import * as React from 'react';
import SjekkOppfolging from './komponenter/hent-initial-data/sjekk-oppfolging';
import { connect } from 'react-redux';
import { AppState } from './reducer';
import { selectSykmeldtInfo, State as SykmeldtInfoState } from './ducks/sykmeldt-info';
import {Data as OppfolgingData, selectOppfolging } from './ducks/oppfolging';
import { erUnderOppfolging } from './komponenter/hent-initial-data/sjekk-oppfolging-utils';
import StartsideSykmeldt from './sider/startside-sykmeldt/startside-sykmeldt';
import StartsideOrdinaer from './sider/startside-ordinaer/startside-ordinaer';
import { Redirect, Route, Switch } from 'react-router';

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    oppfolging: OppfolgingData;
}

class Routes extends React.Component<StateProps> {
    render() {
        // TODO: Bytt verdi når beregning av gjenstående sykedager er på plass
        const erSykemeldt = this.props.sykmeldtInfo.data!.erArbeidsrettetOppfolgingSykmeldtInngangAktiv;
        const { oppfolging } = this.props;

        if (erSykemeldt && erUnderOppfolging(oppfolging)) {
            return (
                <Switch>
                    <Route path="/" exact={true} component={StartsideSykmeldt}/>
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
    sykmeldtInfo: selectSykmeldtInfo(state),
    oppfolging: selectOppfolging(state).data
});

export default connect(mapStateToProps, null, null, {pure: false})(Routes);
