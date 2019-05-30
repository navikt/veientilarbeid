import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { Innsatsgruppe, State as InnsatsgruppeState } from '../ducks/innsatsgruppe';
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

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    innsatsgruppe: InnsatsgruppeState;
    fremtidigSvar: FremtidigSituasjonSvar;
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe | undefined;
    reservasjonKRR: boolean;
    opprettetRegistreringDato: Date;
    harEgenvurderingbesvarelse: boolean;
}

class InnholdLogikkNiva4 extends React.Component<StateProps> {

    componentDidMount() {
        const erSykmeldtMedArbeidsgiver = this.props.sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;
        const innsatsgruppe = this.props.innsatsgruppe.data.innsatsgruppe;
        seVeientilarbeid(erSykmeldtMedArbeidsgiver, innsatsgruppe);
    }

    render() {
        const {sykmeldtInfo, innsatsgruppe, fremtidigSvar, harEgenvurderingbesvarelse,
            foreslattInnsatsgruppe, reservasjonKRR, opprettetRegistreringDato} = this.props;

        const erSykmeldtMedArbeidsgiver = sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;

        const skalViseTiltaksinfoLenke = (
            erSykmeldtMedArbeidsgiver ||
            innsatsgruppe.data.innsatsgruppe === Innsatsgruppe.BFORM ||
            innsatsgruppe.data.innsatsgruppe === Innsatsgruppe.BATT
        );

        const tilbakeTilSammeArbeidsgiver = (
            fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
            fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING
        );

        const visRessurslenker = !(tilbakeTilSammeArbeidsgiver && erSykmeldtMedArbeidsgiver);

        const skalViseEgenvurderingLenke = (
            innsatsgruppe.data.innsatsgruppe === Innsatsgruppe.IVURD &&
            !harEgenvurderingbesvarelse &&
            opprettetRegistreringDato >= LANSERINGSDATO &&
            !reservasjonKRR &&
            (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
                foreslattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)
        );

        return (
            <InnholdView
                erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver}
                skalViseKrrMelding={this.props.reservasjonKRR}
                skalViseEgenvurderingLenke={skalViseEgenvurderingLenke}
                visRessurslenker={visRessurslenker}
                skalViseTiltaksinfoLenke={skalViseTiltaksinfoLenke}
            />
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldtInfo: selectSykmeldtInfo(state),
    innsatsgruppe: state.innsatsgruppe,
    fremtidigSvar: selectFremtidigSituasjonSvar(state),
    reservasjonKRR: state.oppfolging.data.reservasjonKRR,
    foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state),
    opprettetRegistreringDato: new Date(selectOpprettetRegistreringDato(state)),
    harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,

});

export default connect(mapStateToProps)(InnholdLogikkNiva4);
