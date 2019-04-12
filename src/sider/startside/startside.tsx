import * as React from 'react';
import { connect } from 'react-redux';
import Rad from './rad';
import { AppState } from '../../reducer';
import AapRad from '../../komponenter/aap/aap';
import Dialog from '../../komponenter/dialog/dialog';
import Banner from '../../komponenter/banner/banner';
import Meldekort from '../../komponenter/meldekort/meldekort';
import DittSykefravaer from '../../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import Dagpenger from '../../komponenter/dagpenger/dagpenger';
import Tiltakinfo from '../../komponenter/tiltakinfo/tiltakinfo';
import OkonomiRad from '../../komponenter/okonomi/okonomi-rad';
import ReaktiveringMelding from '../../komponenter/reaktivering-melding';
import Aktivitetsplan from '../../komponenter/aktivitetsplan/aktivitetsplan';
import { Servicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { selectSykmeldtInfo, State as SykmeldtInfoState } from '../../ducks/sykmeldt-info';
import RessurslenkerJobbsok from '../../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import { FremtidigSituasjonSvar, Innsatsgruppe, selectFremtidigSituasjonSvar, selectInnsatsgruppe } from '../../ducks/brukerregistrering';
import Egenvurdering from "../../komponenter/egenvurdering/egenvurdering";
import { FeatureToggleState, egenvurderingToggleKey } from '../../ducks/feature-toggles';

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    servicegruppe: ServicegruppeState;
    fremtidigSvar: FremtidigSituasjonSvar;
    innsatsgruppe: Innsatsgruppe;
    features: FeatureToggleState;
    reservasjonKRR: boolean;
}

class Startside extends React.Component<StateProps> {

    erInnsatsgruppe() {
        return (
            this.props.servicegruppe.data.servicegruppe === Servicegruppe.BFORM ||
            this.props.servicegruppe.data.servicegruppe === Servicegruppe.BATT
        );
    }

    skalViseEgenvurdering() {
        const erIkkeReservertKRR = !this.props.reservasjonKRR;
        return (
            erIkkeReservertKRR &&
            this.props.innsatsgruppe === Innsatsgruppe.STANDARD_INNSATS ||
            this.props.innsatsgruppe === Innsatsgruppe.SITUASJONSBESTEMT_INNSATS
        );
    }

    static tilbakeTilSammeArbeidsgiver(svar: FremtidigSituasjonSvar): boolean {
        return (
            svar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
            svar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING
        );
    }

    render() {
        const erSykmeldtMedArbeidsgiver = this.props.sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;
        const innsatsgruppe = this.erInnsatsgruppe();
        const skalviseEgenvurdering = this.skalViseEgenvurdering();
        const visRessurslenker = !(Startside.tilbakeTilSammeArbeidsgiver(this.props.fremtidigSvar) && erSykmeldtMedArbeidsgiver);
        const featureEgenvurdering = this.props.features[egenvurderingToggleKey];
        return (
            <>
                { erSykmeldtMedArbeidsgiver ? <Banner type="sykmeldt"/> : <Banner type="ordinaer"/> }

                <Rad>
                    <ReaktiveringMelding/>
                    { featureEgenvurdering && skalviseEgenvurdering ? <Egenvurdering/> : null }
                    <Aktivitetsplan/>
                    <div className="tokol">
                        <Dialog/>
                        { erSykmeldtMedArbeidsgiver ? <DittSykefravaer/> : <Meldekort/> }
                    </div>
                </Rad>

                { erSykmeldtMedArbeidsgiver && (
                    <Rad><AapRad/></Rad>
                )}

                <Rad>
                    { visRessurslenker ? <RessurslenkerJobbsok/> : null }
                    { (innsatsgruppe || erSykmeldtMedArbeidsgiver) ? <Tiltakinfo/> : null }
                </Rad>

                <Rad>
                    { erSykmeldtMedArbeidsgiver ? <OkonomiRad/> : <Dagpenger/> }
                </Rad>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldtInfo: selectSykmeldtInfo(state),
    servicegruppe: state.servicegruppe,
    fremtidigSvar: selectFremtidigSituasjonSvar(state),
    innsatsgruppe: selectInnsatsgruppe(state),
    features: state.featureToggles,
    reservasjonKRR: state.oppfolging.data.reservasjonKRR,
});

export default connect(mapStateToProps)(Startside);
