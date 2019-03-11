import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import Dialog from '../../komponenter/dialog/dialog';
import Banner from '../../komponenter/banner/banner';
import Dagpenger from '../../komponenter/dagpenger/dagpenger';
import Meldekort from '../../komponenter/meldekort/meldekort';
import Tiltakinfo from '../../komponenter/tiltakinfo/tiltakinfo';
import ReaktiveringMelding from '../../komponenter/reaktivering-melding';
import Aktivitetsplan from '../../komponenter/aktivitetsplan/aktivitetsplan';
import { Servicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import RessurslenkerJobbsok from '../../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';

import './startside-ordinaer.less';

interface StateProps {
    servicegruppe: ServicegruppeState;
}

class StartsideOrdinaer extends React.Component<StateProps> {

    erInnsatsgruppe() {
        return (
            this.props.servicegruppe.data.servicegruppe === Servicegruppe.BFORM ||
            this.props.servicegruppe.data.servicegruppe === Servicegruppe.BATT
        );
    }

    render() {
        const innsatsgruppe = this.erInnsatsgruppe();

        return (
            <>
                <Banner tittelId="startside-ordinaer-banner-tittel" brodsmuleId="startside-ordinaer-banner-brodsmule"/>
                <div className="rad">
                    <div className="limit">
                        <ReaktiveringMelding/>
                        <Aktivitetsplan/>
                        <div className="tokol">
                            <Dialog/>
                            <Meldekort/>
                        </div>
                    </div>
                </div>
                <div className="rad">
                    <div className="limit">
                        <RessurslenkerJobbsok/>
                    </div>
                </div>
                {innsatsgruppe && (
                    <div className="rad">
                        <div className="limit">
                            <Tiltakinfo/>
                        </div>
                    </div>
                )}
                <div className="rad">
                    <div className="limit">
                        <Dagpenger/>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.servicegruppe,
});

export default connect(mapStateToProps)(StartsideOrdinaer);
