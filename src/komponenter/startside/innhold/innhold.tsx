import * as React from 'react';
import { connect } from 'react-redux';
import Aktivitetsplan from '../aktivitetsplan/aktivitetsplan';
import Ressurslenker from '../ressurslenker/ressurslenker';
import Dagpenger from '../informasjonsmoduler/dagpenger/dagpenger';
import Meldekort from '../meldekort/meldekort';
import Tiltakinfo from '../tiltakinfo/tiltakinfo';
import ReaktiveringMelding from '../reaktivering-melding/reaktivering-melding';
import { selectServicegruppe, State as ServicegruppeState, SituasjonOption } from '../../ducks/servicegruppe';
import { AppState } from '../../reducer';
import { selectHentServicegruppekodeFeatureToggle } from '../../ducks/feature-toggles';

import './innhold.less';

interface StateProps {
    servicegruppe: ServicegruppeState;
    featureToggleServicegruppe: boolean;
}

type Props = StateProps;

class Innhold extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

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
            <div className="innhold__wrapper">
                <div className="innhold">
                    <ReaktiveringMelding />
                    <Aktivitetsplan />
                    <Meldekort />
                    <Ressurslenker />
                    {innsatsgruppe && featureToggleServicegruppe && (
                        <Tiltakinfo />
                    )}
                    <Dagpenger />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: selectServicegruppe(state),
    featureToggleServicegruppe: selectHentServicegruppekodeFeatureToggle(state),
});

export default connect(mapStateToProps)(Innhold);
