import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { Servicegruppe, State as ServicegruppeState } from '../ducks/servicegruppe';
import { selectSykmeldtInfo, State as SykmeldtInfoState } from '../ducks/sykmeldt-info';
import {
    ForeslattInnsatsgruppe,
    FremtidigSituasjonSvar, selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar, selectOpprettetRegistreringDato
} from '../ducks/brukerregistrering';
import { seVeientilarbeid } from '../metrics';
import './innhold.less';
import InnholdView from './innhold-view';

const LANSERINGSDATO = new Date(2019, 4, 10);
const LANSERINGSDATO_V2 = new Date(2019, 6, 1);

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    servicegruppe: ServicegruppeState;
    fremtidigSvar: FremtidigSituasjonSvar;
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe | undefined;
    reservasjonKRR: boolean;
    opprettetRegistreringDato: Date;
    harEgenvurderingbesvarelse: boolean;
    harMotestottebesvarelse: boolean;
}

class InnholdLogikk extends React.Component<StateProps> {

    componentDidMount() {
        const erSykmeldtMedArbeidsgiver = this.props.sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;
        const servicegruppe = this.props.servicegruppe.data.servicegruppe;
        seVeientilarbeid(erSykmeldtMedArbeidsgiver, servicegruppe);
    }

    render() {
        const {sykmeldtInfo, servicegruppe, fremtidigSvar, harEgenvurderingbesvarelse,
            foreslattInnsatsgruppe, reservasjonKRR, harMotestottebesvarelse, opprettetRegistreringDato} = this.props;

        const erSykmeldtMedArbeidsgiver = sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;

        const skalViseTiltaksinfoLenke = (
            erSykmeldtMedArbeidsgiver ||
            servicegruppe.data.servicegruppe === Servicegruppe.BFORM ||
            servicegruppe.data.servicegruppe === Servicegruppe.BATT
        );

        const tilbakeTilSammeArbeidsgiver = (
            fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
            fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING
        );

        const visRessurslenker = !(tilbakeTilSammeArbeidsgiver && erSykmeldtMedArbeidsgiver);

        const skalViseEgenvurderingLenke = (
            !harEgenvurderingbesvarelse &&
            opprettetRegistreringDato >= LANSERINGSDATO &&
            !reservasjonKRR &&
            (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
                foreslattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)
        );

        const skalViseMoteStotteLenke = (
            !harMotestottebesvarelse &&
            opprettetRegistreringDato >= LANSERINGSDATO_V2 &&
            !reservasjonKRR &&
            (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING)
        );

        return (
            <InnholdView
                erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver}
                skalViseKrrMelding={this.props.reservasjonKRR}
                skalViseEgenvurderingLenke={skalViseEgenvurderingLenke}
                skalViseMoteStotteLenke={skalViseMoteStotteLenke}
                visRessurslenker={visRessurslenker}
                skalViseTiltaksinfoLenke={skalViseTiltaksinfoLenke}
            />
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldtInfo: selectSykmeldtInfo(state),
    servicegruppe: state.servicegruppe,
    fremtidigSvar: selectFremtidigSituasjonSvar(state),
    reservasjonKRR: state.oppfolging.data.reservasjonKRR,
    foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state),
    opprettetRegistreringDato: new Date(selectOpprettetRegistreringDato(state)),
    harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,
    harMotestottebesvarelse: state.motestottebesvarelse.data !== null,

});

export default connect(mapStateToProps)(InnholdLogikk);
