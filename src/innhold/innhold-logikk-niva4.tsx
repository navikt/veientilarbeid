import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { Data, Innsatsgruppe, InnsatsgruppeContext } from '../ducks/innsatsgruppe';
import { selectSykmeldtMedArbeidsgiver } from '../ducks/sykmeldt-info';
import {
    ForeslattInnsatsgruppe,
    FremtidigSituasjonSvar, selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar, selectOpprettetRegistreringDato
} from '../ducks/brukerregistrering';
import { seVeientilarbeid } from '../metrics';
import { hotjarTrigger } from '../hotjar';
import './innhold.less';
import InnholdView from './innhold-view';
import { MotestotteContext } from '../ducks/motestotte';

// TODO Fjerne etter tre mnd?
const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);
const LANSERINGSDATO_MOTESTOTTE = new Date(2020, 5, 3);

interface StateProps {
    erSykmeldtMedArbeidsgiver: boolean;
    fremtidigSvar: FremtidigSituasjonSvar | null;
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null;
    reservasjonKRR: boolean;
    opprettetRegistreringDato: Date | null;
    harEgenvurderingbesvarelse: boolean;
    egenvurderingbesvarelseDato: Date | null;
}

const InnholdLogikkNiva4 = ({
                                erSykmeldtMedArbeidsgiver, fremtidigSvar, harEgenvurderingbesvarelse,
                                egenvurderingbesvarelseDato,
                                foreslattInnsatsgruppe, reservasjonKRR, opprettetRegistreringDato
                            }: StateProps) => {

    const innsatsgruppeData: Data | null = React.useContext(InnsatsgruppeContext).data;
    const innsatsgruppe = innsatsgruppeData ? innsatsgruppeData.servicegruppe : null;

    React.useEffect(() => {
        seVeientilarbeid(erSykmeldtMedArbeidsgiver, innsatsgruppe);
        hotjarTrigger();
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

    const egenvurderingsbesvarelseValid = (): boolean => {
        let isValid = false;
        if (opprettetRegistreringDato && egenvurderingbesvarelseDato) {
            isValid = opprettetRegistreringDato <= egenvurderingbesvarelseDato;
        }
        return isValid;
    };

    const skalViseEgenvurderingLenke = (
        innsatsgruppe === Innsatsgruppe.IVURD &&
        (!harEgenvurderingbesvarelse || !egenvurderingsbesvarelseValid()) &&
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
        fremtidigSvar: selectFremtidigSituasjonSvar(state),
        reservasjonKRR: state.oppfolging.data.reservasjonKRR,
        foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state),
        opprettetRegistreringDato: opprettetRegistreringDato ? new Date(opprettetRegistreringDato) : null,
        harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,
        egenvurderingbesvarelseDato: state.egenvurderingbesvarelse.data ? new Date(state.egenvurderingbesvarelse.data.sistOppdatert) : null

    };
};

export default connect(mapStateToProps)(InnholdLogikkNiva4);
