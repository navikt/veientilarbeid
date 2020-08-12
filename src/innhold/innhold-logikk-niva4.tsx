import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { erMikrofrontend } from '../utils/app-state-utils';
import { BrukerInfoContext } from '../ducks/bruker-info';
import { FeaturetoggleContext } from '../ducks/feature-toggles';
import {
    BrukerregistreringContext,
    ForeslattInnsatsgruppe,
    FremtidigSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar,
    selectOpprettetRegistreringDato,
    selectDinSituasjonSvar
} from '../ducks/brukerregistrering';
import { seVeientilarbeid, seIARBSPlaster, tellPoaGruppe } from '../metrics/metrics';
import { hotjarTrigger } from '../hotjar';
import './innhold.less';
import InnholdView from './innhold-view';
import { MotestotteContext } from '../ducks/motestotte';
import { SituasjonContext } from '../ducks/situasjon';
import { Formidlingsgruppe, OppfolgingContext, Servicegruppe } from '../ducks/oppfolging';
import getPoaGroup from '../utils/get-poa-group'
// import { RegistreringType } from '../ducks/bruker-info'

const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);
const LANSERINGSDATO_MOTESTOTTE = new Date('2020-03-12');

interface StateProps {
    harEgenvurderingbesvarelse: boolean;
    egenvurderingbesvarelseDato: Date | null;
}

const InnholdLogikkNiva4 = ({harEgenvurderingbesvarelse, egenvurderingbesvarelseDato}: StateProps) => {

    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const featureToggleData = React.useContext(FeaturetoggleContext).data;
    const SituasjonData = React.useContext(SituasjonContext).data;
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(brukerregistreringData);
    const opprettetRegistreringDato = opprettetRegistreringDatoString ? new Date(opprettetRegistreringDatoString) : null;
    const fremtidigSvar = selectFremtidigSituasjonSvar(brukerregistreringData);
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(brukerregistreringData);
    const dinSituasjon = selectDinSituasjonSvar(brukerregistreringData) || 'INGEN_VERDI';

    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const { formidlingsgruppe, servicegruppe, underOppfolging, reservasjonKRR } = oppfolgingData;
    const underOppfolgingJaNei = underOppfolging ? 'ja' : 'nei';
    const reservasjonKRRJaNei = reservasjonKRR ? 'ja' : 'nei';
    const skalViseRegistrert = formidlingsgruppe === Formidlingsgruppe.ARBS;
    
    const brukerinfoData = React.useContext(BrukerInfoContext).data;
    const { erSykmeldtMedArbeidsgiver, registreringType, rettighetsgruppe, alder, geografiskTilknytning } = brukerinfoData;
    const skalViseIARBSPlaster = false // formidlingsgruppe === Formidlingsgruppe.IARBS && registreringType === RegistreringType.ALLEREDE_REGISTRERT && rettighetsgruppe !== 'AAP';
    const geografiskTilknytningOrIngenVerdi = geografiskTilknytning ? geografiskTilknytning  : 'INGEN_VERDI'
    const registreringTypeOrIngenVerdi = registreringType ? registreringType : 'INGEN_VERDI';
    const foreslattInnsatsgruppeOrIngenVerdi = foreslattInnsatsgruppe ? foreslattInnsatsgruppe : 'INGEN_VERDI'
    const fremtidigSvarOrIngenVerdi = fremtidigSvar ? fremtidigSvar : 'INGEN_VERDI';
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe ? formidlingsgruppe : 'INGEN_VERDI';
    const servicegruppeOrIVURD = servicegruppe ? servicegruppe : 'IVURD';
    const permittertToggle = featureToggleData ? featureToggleData['veientilarbeid.permittert.ny-dialog'] : false;
    const endreSituasjonToggle = featureToggleData ? featureToggleData['veientilarbeid.permittert.situasjon.endre'] : false;

    const erPermittert = dinSituasjon === 'ER_PERMITTERT' && permittertToggle === true
    const erPermittertEllerEndret = endreSituasjonToggle && (erPermittert || SituasjonData !== null)
    const POAGruppe = getPoaGroup({
        dinSituasjon,
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        innsatsgruppe: foreslattInnsatsgruppeOrIngenVerdi,
        alder,
        servicegruppe: servicegruppeOrIVURD,
        opprettetRegistreringDato });

    /*
        Funksjon hvor man bygger opp kriterier for et eksperiment og retunerer true/false
        ettersom brukeren kommer inn under eksperimentet eller ei
    */
    const hotjarEksperiment = () => {
        return false
    };

    React.useEffect(() => {
        seVeientilarbeid(
            erSykmeldtMedArbeidsgiver,
            servicegruppe,
            erMikrofrontend(),
            formidlingsgruppe,
            rettighetsgruppe,
            dinSituasjon,
            underOppfolgingJaNei,
            registreringTypeOrIngenVerdi,
            fremtidigSvarOrIngenVerdi,
            reservasjonKRRJaNei
    );
        hotjarTrigger(erMikrofrontend(), POAGruppe, hotjarEksperiment());
        seIARBSPlaster(skalViseIARBSPlaster, formidlingsgruppe, servicegruppe, rettighetsgruppe);
        tellPoaGruppe( POAGruppe, geografiskTilknytningOrIngenVerdi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        dinSituasjon !== 'ER_PERMITTERT' &&
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
        dinSituasjon !== 'ER_PERMITTERT' &&
        oppfolgingData.servicegruppe === Servicegruppe.BKART &&
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
            skalViseIARBSPlaster={skalViseIARBSPlaster}
            skalViseRegistrert={skalViseRegistrert}
            erPermittert={erPermittert}
            erPermittertEllerEndret={erPermittertEllerEndret}
            poaGruppe={POAGruppe}
            geografiskTilknytning={geografiskTilknytningOrIngenVerdi}
        />
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,
    egenvurderingbesvarelseDato: state.egenvurderingbesvarelse.data ? new Date(state.egenvurderingbesvarelse.data.sistOppdatert) : null
});

export default connect(mapStateToProps)(InnholdLogikkNiva4);
