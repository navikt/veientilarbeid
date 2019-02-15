import * as React from 'react';
import SjekkOppfolging from './komponenter/hent-initial-data/sjekk-oppfolging';
import { connect } from 'react-redux';
import { AppState } from './reducer';
import { selectSykmeldtInfo, State as SykmeldtInfoState } from './ducks/sykmeldt-info';
import StartsideSykmeldt from './sider/startside-sykmeldt/startside-sykmeldt';
import StartsideOrdinaer from './sider/startside-ordinaer/startside-ordinaer';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
}

type AllProps = StateProps & RouteComponentProps<any>; // tslint:disable-line

class Routes extends React.Component<AllProps> {
    render() {
        const erSykmeldtMedArbeidsgiver = this.props.sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;
        const { location } = this.props;
        const search = location.search;

        if (erSykmeldtMedArbeidsgiver === true) {
            return (
                <Switch>
                    <Route path="/" exact={true} component={StartsideSykmeldt}/>
                    <Redirect to={'/' + search}/>
                </Switch>
            );
        } else {
            return (
                <SjekkOppfolging>
                    <Route path="/" exact={true} component={StartsideOrdinaer}/>
                    <Redirect to={'/' + search}/>
                </SjekkOppfolging>
            );
        }
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldtInfo: selectSykmeldtInfo(state),
});

export default connect(mapStateToProps, null, null, {pure: false})(withRouter(Routes));
