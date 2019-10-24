import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { erMikrofrontend } from '../utils/app-state-utils';
import { SykmeldtInfoContext } from '../ducks/sykmeldt-info';
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
import { OppfolgingContext, Servicegruppe } from '../ducks/oppfolging';

const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);
const LANSERINGSDATO_MOTESTOTTE = new Date(2020, 5, 3);

interface StateProps {
    harEgenvurderingbesvarelse: boolean;
    egenvurderingbesvarelseDato: Date | null;
}

const InnholdLogikkNiva4 = ({harEgenvurderingbesvarelse, egenvurderingbesvarelseDato}: StateProps) => {

    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(brukerregistreringData);
    const opprettetRegistreringDato = opprettetRegistreringDatoString ? new Date(opprettetRegistreringDatoString) : null;
    const fremtidigSvar = selectFremtidigSituasjonSvar(brukerregistreringData);
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(brukerregistreringData);

    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const isIARBS = oppfolgingData.formidlingsgruppe === 'IARBS'
    console.log(oppfolgingData)

    const erSykmeldtMedArbeidsgiver = React.useContext(SykmeldtInfoContext).data.erSykmeldtMedArbeidsgiver;

    React.useEffect(() => {
        seVeientilarbeid(
            erSykmeldtMedArbeidsgiver,
            oppfolgingData.servicegruppe,
            erMikrofrontend(),
            oppfolgingData.formidlingsgruppe
        );
        hotjarTrigger(erMikrofrontend());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const skalViseTiltaksinfoLenke = (
        erSykmeldtMedArbeidsgiver ||
        oppfolgingData.servicegruppe === Servicegruppe.BFORM ||
        oppfolgingData.servicegruppe === Servicegruppe.BATT
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
        oppfolgingData.servicegruppe === Servicegruppe.IVURD &&
        (!harEgenvurderingbesvarelse || !egenvurderingsbesvarelseValid()) &&
        (opprettetRegistreringDato !== null && opprettetRegistreringDato >= LANSERINGSDATO_EGENVURDERING) &&
        !oppfolgingData.reservasjonKRR &&
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
        oppfolgingData.servicegruppe === Servicegruppe.IVURD &&
        (!harMotestottebesvarelse || !motestottebesvarelseValid()) &&
        (opprettetRegistreringDato !== null && opprettetRegistreringDato >= LANSERINGSDATO_MOTESTOTTE) &&
        !oppfolgingData.reservasjonKRR &&
        (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING)
    );

    return (
        <InnholdView
            erSykmeldtMedArbeidsgiver={erSykmeldtMedArbeidsgiver}
            skalViseKrrMelding={oppfolgingData.reservasjonKRR}
            skalViseEgenvurderingLenke={skalViseEgenvurderingLenke}
            skalViseMotestotteLenke={skalViseMotestotteLenke}
            visRessurslenker={visRessurslenker}
            skalViseTiltaksinfoLenke={skalViseTiltaksinfoLenke}
            isIARBS={isIARBS}
        />
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,
    egenvurderingbesvarelseDato: state.egenvurderingbesvarelse.data ? new Date(state.egenvurderingbesvarelse.data.sistOppdatert) : null
});

export default connect(mapStateToProps)(InnholdLogikkNiva4);
