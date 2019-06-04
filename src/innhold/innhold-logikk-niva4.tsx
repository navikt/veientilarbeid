import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { Innsatsgruppe } from '../ducks/innsatsgruppe';
import { selectSykmeldtMedArbeidsgiver } from '../ducks/sykmeldt-info';
import {
    ForeslattInnsatsgruppe,
    FremtidigSituasjonSvar, selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar, selectOpprettetRegistreringDato
} from '../ducks/brukerregistrering';
import { seVeientilarbeid } from '../metrics';
import './innhold.less';
import InnholdView from './innhold-view';
import { MotestotteContext } from '../ducks/motestotte';

// TODO Fjerne etter tre mnd?
const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);
const LANSERINGSDATO_MOTESTOTTE = new Date(2020, 5, 3);

interface StateProps {
    erSykmeldtMedArbeidsgiver: boolean;
    innsatsgruppe: Innsatsgruppe;
    fremtidigSvar: FremtidigSituasjonSvar | null;
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null;
    reservasjonKRR: boolean;
    opprettetRegistreringDato: Date | null;
    harEgenvurderingbesvarelse: boolean;
    erReaktivert: boolean;
}

const InnholdLogikkNiva4 = ({
                                erSykmeldtMedArbeidsgiver, innsatsgruppe, fremtidigSvar, harEgenvurderingbesvarelse,
                                foreslattInnsatsgruppe, reservasjonKRR, opprettetRegistreringDato, erReaktivert
                            }: StateProps) => {

    React.useEffect(() => {
        seVeientilarbeid(erSykmeldtMedArbeidsgiver, innsatsgruppe);
    }, []);

    const skalViseTiltaksinfoLenke = (
        erSykmeldtMedArbeidsgiver ||
        innsatsgruppe === Innsatsgruppe.BFORM ||
        innsatsgruppe === Innsatsgruppe.BATT
    );

    const tilbakeTilSammeArbeidsgiver = (
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING
    );

    const visRessurslenker = !(tilbakeTilSammeArbeidsgiver && erSykmeldtMedArbeidsgiver);

    const skalViseEgenvurderingLenke = (
        innsatsgruppe === Innsatsgruppe.IVURD &&
        (!harEgenvurderingbesvarelse || erReaktivert) &&
        (opprettetRegistreringDato !== null && opprettetRegistreringDato >= LANSERINGSDATO_EGENVURDERING) &&
        !reservasjonKRR &&
        (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
            foreslattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)
    );

    const harMotestottebesvarelse = React.useContext(MotestotteContext).data !== null;

    const skalViseMotestotteLenke = (
        innsatsgruppe === Innsatsgruppe.IVURD &&
        !harMotestottebesvarelse &&
        (opprettetRegistreringDato !== null && opprettetRegistreringDato >= LANSERINGSDATO_MOTESTOTTE) &&
        !reservasjonKRR &&
        (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING)
    );

    return (
        <InnholdView
            erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver}
            skalViseKrrMelding={reservasjonKRR}
            skalViseEgenvurderingLenke={skalViseEgenvurderingLenke}
            skalViseMotestotteLenke={skalViseMotestotteLenke}
            visRessurslenker={visRessurslenker}
            skalViseTiltaksinfoLenke={skalViseTiltaksinfoLenke}
        />
    );
};

const mapStateToProps = (state: AppState): StateProps => {
    const opprettetRegistreringDato = selectOpprettetRegistreringDato(state);

    return {
        erSykmeldtMedArbeidsgiver: selectSykmeldtMedArbeidsgiver(state),
        innsatsgruppe: state.innsatsgruppe.data.innsatsgruppe,
        fremtidigSvar: selectFremtidigSituasjonSvar(state),
        reservasjonKRR: state.oppfolging.data.reservasjonKRR,
        foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state),
        opprettetRegistreringDato: opprettetRegistreringDato ? new Date(opprettetRegistreringDato) : null,
        harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,
        erReaktivert: state.oppfolging.data.erReaktivert

    };
};

export default connect(mapStateToProps)(InnholdLogikkNiva4);
