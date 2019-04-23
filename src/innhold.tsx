import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from './reducer';
import { seVeientilarbeid } from './metrics';
import Startside from './sider/startside/startside';
import SjekkOppfolging from './komponenter/hent-initial-data/sjekk-oppfolging';
import { selectSykmeldtInfo, State as SykmeldtInfoState } from './ducks/sykmeldt-info';
import { selectServicegruppe, State as ServicegruppeState } from './ducks/servicegruppe';

import './sider/startside/startside.less';

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    servicegruppe: ServicegruppeState;
}

class Innhold extends React.Component<StateProps> {

    componentDidMount() {
        const erSykmeldtMedArbeidsgiver = this.props.sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;
        const servicegruppe = this.props.servicegruppe.data.servicegruppe;
        seVeientilarbeid(erSykmeldtMedArbeidsgiver, servicegruppe);
    }

    render() {
        return (
            <SjekkOppfolging>
                <Startside/>
            </SjekkOppfolging>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldtInfo: selectSykmeldtInfo(state),
    servicegruppe: selectServicegruppe(state),
});

export default connect(mapStateToProps, null, null, {pure: false})(Innhold);
