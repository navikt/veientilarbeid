import * as React from 'react';
import Side from '../../komponenter/side';
import { SituasjonOption, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { AppState } from '../../reducer';
import { servicekodeToggleKey } from '../../ducks/feature-toggles';
import { connect } from 'react-redux';
import ReaktiveringMelding from '../../komponenter/reaktivering-melding';
import Aktivitetsplan from '../../komponenter/aktivitetsplan/aktivitetsplan';
import Meldekort from '../../komponenter/meldekort/meldekort';
import Ressurslenker from '../../komponenter/ressurslenker/ressurslenker';
import Tiltakinfo from '../../komponenter/tiltakinfo/tiltakinfo';
import Dagpenger from '../../komponenter/dagpenger/dagpenger';
import StillingSok from '../../komponenter/stillingsok/stillingsok';

interface StateProps {
    servicegruppe: ServicegruppeState;
    featureToggleServicegruppe: boolean;
}

class StartsideOrdinaer extends React.Component<StateProps> {

    erInnsatsgruppe() {
        return (
            this.props.servicegruppe.data.servicegruppe === SituasjonOption.SITUASJONSBESTEMT ||
            this.props.servicegruppe.data.servicegruppe === SituasjonOption.SPESIELT_TILPASSET
        );
    }

    render() {
        const innsatsgruppe = this.erInnsatsgruppe();
        const {featureToggleServicegruppe} = this.props;

        return (
            <Side
                bannerTittelId="startside-ordinaer-banner-tittel"
                bannerBrodsmuleId="startside-ordinaer-banner-brodsmule"
            >
                <main className="innhold">
                    <ReaktiveringMelding/>
                    <Aktivitetsplan/>
                    <Meldekort/>
                    <StillingSok/>
                    <Ressurslenker/>
                    {innsatsgruppe && featureToggleServicegruppe && (
                        <Tiltakinfo/>
                    )}
                    <Dagpenger/>
                </main>
            </Side>
        );
    }

}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.servicegruppe,
    featureToggleServicegruppe: state.featureToggles[servicekodeToggleKey],
});

export default connect(mapStateToProps)(StartsideOrdinaer);
