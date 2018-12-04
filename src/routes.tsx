import * as React from 'react';
import SjekkOppfolging from './komponenter/hent-initial-data/sjekk-oppfolging';
import { connect } from 'react-redux';
import { AppState } from './reducer';
import { selectSykeforloepMetadata, State as SykeforloepMetadataState } from './ducks/sykeforloep-metadata';
import { selectOppfolging, Data as OppfolgingData } from './ducks/oppfolging';
import { erUnderOppfolging } from './komponenter/hent-initial-data/sjekk-oppfolging-utils';
import StartsideSykmeldt from './sider/startside-sykmeldt/startside-sykmeldt';
import StartsideOrdinaer from './sider/startside-ordinaer/startside-ordinaer';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';

interface StateProps {
    sykeforloepMetadata: SykeforloepMetadataState;
    oppfolging: OppfolgingData;
}

type AllProps = StateProps & RouteComponentProps<any>; // tslint:disable-line

class Routes extends React.Component<AllProps> {
    render() {
        // TODO: Bytt verdi når beregning av gjenstående sykedager er på plass
        const erSykemeldt = this.props.sykeforloepMetadata.data!.erArbeidsrettetOppfolgingSykmeldtInngangAktiv;
        const { oppfolging, location } = this.props;
        const search = location.search;

        if (erSykemeldt && erUnderOppfolging(oppfolging)) {
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
    sykeforloepMetadata: selectSykeforloepMetadata(state),
    oppfolging: selectOppfolging(state).data
});

export default connect(mapStateToProps, null, null, {pure: false})(withRouter(Routes));
