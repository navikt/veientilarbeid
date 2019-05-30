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

// TODO Fjerne etter tre mnd?
const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);
const LANSERINGSDATO_MOTESTOTTE = new Date(2019, 5, 4);

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    innsatsgruppe: InnsatsgruppeState;
    fremtidigSvar: FremtidigSituasjonSvar;
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe | undefined;
    reservasjonKRR: boolean;
    opprettetRegistreringDato: Date;
    harEgenvurderingbesvarelse: boolean;
    harMotestottebesvarelse: boolean;
}

class InnholdLogikkNiva4 extends React.Component<StateProps> {

    componentDidMount() {
        const erSykmeldtMedArbeidsgiver = this.props.sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;
        const innsatsgruppe = this.props.innsatsgruppe.data.innsatsgruppe;
        seVeientilarbeid(erSykmeldtMedArbeidsgiver, innsatsgruppe);
    }

    render() {
        const {sykmeldtInfo, innsatsgruppe, fremtidigSvar, harEgenvurderingbesvarelse,
            foreslattInnsatsgruppe, reservasjonKRR, opprettetRegistreringDato, harMotestottebesvarelse} = this.props;

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
            opprettetRegistreringDato >= LANSERINGSDATO_EGENVURDERING &&
            !reservasjonKRR &&
            (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
                foreslattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)
        );

        const skalViseMoteStotteLenke = (
            innsatsgruppe.data.innsatsgruppe === Innsatsgruppe.IVURD &&
            !harMotestottebesvarelse &&
            opprettetRegistreringDato >= LANSERINGSDATO_MOTESTOTTE &&
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
    innsatsgruppe: state.innsatsgruppe,
    fremtidigSvar: selectFremtidigSituasjonSvar(state),
    reservasjonKRR: state.oppfolging.data.reservasjonKRR,
    foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state),
    opprettetRegistreringDato: new Date(selectOpprettetRegistreringDato(state)),
    harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,
    harMotestottebesvarelse: state.motestottebesvarelse.data !== null,

});

export default connect(mapStateToProps)(InnholdLogikkNiva4);
