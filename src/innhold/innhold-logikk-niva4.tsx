import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { erMikrofrontend } from '../utils/app-state-utils';
import { selectSykmeldtMedArbeidsgiver } from '../ducks/sykmeldt-info';
import {
    BrukerregistreringContext,
    ForeslattInnsatsgruppe,
    FremtidigSituasjonSvar, selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar, selectOpprettetRegistreringDato
} from '../ducks/brukerregistrering';
import { seVeientilarbeid } from '../metrics/metrics';
import { hotjarTrigger } from '../hotjar';
import './innhold.less';
import InnholdView from './innhold-view';
import { MotestotteContext } from '../ducks/motestotte';
import { Servicegruppe } from '../ducks/oppfolging';

// TODO Fjerne etter tre mnd?
const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);
const LANSERINGSDATO_MOTESTOTTE = new Date(2020, 5, 3);

interface StateProps {
    erSykmeldtMedArbeidsgiver: boolean;
    reservasjonKRR: boolean;
    servicegruppe: Servicegruppe | null;
    harEgenvurderingbesvarelse: boolean;
    egenvurderingbesvarelseDato: Date | null;
}

const InnholdLogikkNiva4 = ({
                                erSykmeldtMedArbeidsgiver, harEgenvurderingbesvarelse, egenvurderingbesvarelseDato,
                                reservasjonKRR, servicegruppe,
                            }: StateProps) => {

    const data = React.useContext(BrukerregistreringContext).data;
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(data);
    const opprettetRegistreringDato = opprettetRegistreringDatoString ? new Date(opprettetRegistreringDatoString) : null;
    const fremtidigSvar = selectFremtidigSituasjonSvar(data);
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(data);

    React.useEffect(() => {
        seVeientilarbeid(erSykmeldtMedArbeidsgiver, servicegruppe, erMikrofrontend());
        hotjarTrigger(erMikrofrontend());
    }, []);

    const skalViseTiltaksinfoLenke = (
        erSykmeldtMedArbeidsgiver ||
        servicegruppe === Servicegruppe.BFORM ||
        servicegruppe === Servicegruppe.BATT
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
        servicegruppe === Servicegruppe.IVURD &&
        (!harEgenvurderingbesvarelse || !egenvurderingsbesvarelseValid()) &&
        (opprettetRegistreringDato !== null && opprettetRegistreringDato >= LANSERINGSDATO_EGENVURDERING) &&
        !reservasjonKRR &&
        (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
            foreslattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)
    );

    const motestotteData = React.useContext(MotestotteContext).data;
    const harMotestottebesvarelse = motestotteData !== null;

    const motestottebesvarelseValid = (): boolean => {
        let isValid = false;
        if (opprettetRegistreringDato && motestotteData) {
            const motestottebesvarelseDato = new Date(motestotteData.dato);
            isValid = opprettetRegistreringDato <= motestottebesvarelseDato;
        }
        return isValid;
    };

    const skalViseMotestotteLenke = (
        servicegruppe === Servicegruppe.IVURD &&
        (!harMotestottebesvarelse || !motestottebesvarelseValid()) &&
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

const mapStateToProps = (state: AppState): StateProps => ({
    erSykmeldtMedArbeidsgiver: selectSykmeldtMedArbeidsgiver(state),
    reservasjonKRR: state.oppfolging.data.reservasjonKRR,
    servicegruppe: state.oppfolging.data.servicegruppe,
    harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,
    egenvurderingbesvarelseDato: state.egenvurderingbesvarelse.data ? new Date(state.egenvurderingbesvarelse.data.sistOppdatert) : null
});

export default connect(mapStateToProps)(InnholdLogikkNiva4);
