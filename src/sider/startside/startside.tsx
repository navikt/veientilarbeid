import * as React from 'react';
import Side from '../../komponenter/side/side';
import { selectServicegruppe, SituasjonOption, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { AppState } from '../../reducer';
import { selectHentServicegruppekodeFeatureToggle } from '../../ducks/feature-toggles';
import { connect } from 'react-redux';
import ReaktiveringMelding from '../../komponenter/reaktivering-melding/reaktivering-melding';
import Aktivitetsplan from '../../komponenter/aktivitetsplan/aktivitetsplan';
import Meldekort from '../../komponenter/meldekort/meldekort';
import Ressurslenker from '../../komponenter/ressurslenker/ressurslenker';
import Tiltakinfo from '../../komponenter/tiltakinfo/tiltakinfo';
import Dagpenger from '../../komponenter/informasjonsmoduler/dagpenger/dagpenger';

interface StateProps {
    servicegruppe: ServicegruppeState;
    featureToggleServicegruppe: boolean;
}

class Startside extends React.Component<StateProps> {

    erInnsatsgruppe() {
        return (
            this.props.servicegruppe.data.servicegruppe === SituasjonOption.SITUASJONSBESTEMT ||
            this.props.servicegruppe.data.servicegruppe === SituasjonOption.SPESIELT_TILPASSET
        );
    }

    render() {
        const innsatsgruppe = this.erInnsatsgruppe();
        const { featureToggleServicegruppe } = this.props;

        return (
            <Side bannerTittelId="banner-tittel-startside" bannerBrodsmuleId="brodsmuler-startside">
                <ReaktiveringMelding />
                <Aktivitetsplan />
                <Meldekort />
                <Ressurslenker />
                {innsatsgruppe && featureToggleServicegruppe && (
                    <Tiltakinfo />
                )}
                <Dagpenger />
            </Side>
        );
    }

}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: selectServicegruppe(state),
    featureToggleServicegruppe: selectHentServicegruppekodeFeatureToggle(state),
});

export default connect(mapStateToProps)(Startside);
