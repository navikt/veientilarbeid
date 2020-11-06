import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { erMikrofrontend } from '../utils/app-state-utils';
import { BrukerInfoContext } from '../ducks/bruker-info';
import {
    BrukerregistreringContext,
    ForeslattInnsatsgruppe,
    FremtidigSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar,
    selectOpprettetRegistreringDato,
    selectDinSituasjonSvar,
} from '../ducks/brukerregistrering';
import {
    seVeientilarbeid,
    seIARBSPlaster,
    tellPoaGruppe,
    setIdentifyPoaGruppe,
    loggAktivitet,
} from '../metrics/metrics';
import { hotjarTrigger } from '../hotjar';
import './innhold.less';
import InnholdView from './innhold-view';
import { OppfolgingContext, Servicegruppe } from '../ducks/oppfolging';
import getPoaGroup from '../utils/get-poa-group';
import { AmplitudeAktivitetContext } from '../ducks/amplitude-aktivitet-context';
import ukerFraDato from '../utils/uker-fra-dato';
const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);

interface StateProps {
    harEgenvurderingbesvarelse: boolean;
    egenvurderingbesvarelseDato: Date | null;
}

const InnholdLogikkNiva4 = ({ harEgenvurderingbesvarelse, egenvurderingbesvarelseDato }: StateProps) => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(brukerregistreringData);
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const fremtidigSvar = selectFremtidigSituasjonSvar(brukerregistreringData);
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(brukerregistreringData);
    const dinSituasjon = selectDinSituasjonSvar(brukerregistreringData) || 'INGEN_VERDI';

    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const { formidlingsgruppe, servicegruppe, underOppfolging, reservasjonKRR } = oppfolgingData;
    const underOppfolgingJaNei = underOppfolging ? 'ja' : 'nei';
    const reservasjonKRRJaNei = reservasjonKRR ? 'ja' : 'nei';

    const brukerinfoData = React.useContext(BrukerInfoContext).data;
    const { erSykmeldtMedArbeidsgiver, registreringType, rettighetsgruppe, alder } = brukerinfoData;
    const skalViseIARBSPlaster = false; // formidlingsgruppe === Formidlingsgruppe.IARBS && registreringType === RegistreringType.ALLEREDE_REGISTRERT && rettighetsgruppe !== 'AAP';
    const registreringTypeOrIngenVerdi = registreringType ? registreringType : 'INGEN_VERDI';
    const foreslattInnsatsgruppeOrIngenVerdi = foreslattInnsatsgruppe ? foreslattInnsatsgruppe : 'INGEN_VERDI';
    const fremtidigSvarOrIngenVerdi = fremtidigSvar ? fremtidigSvar : 'INGEN_VERDI';
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe ? formidlingsgruppe : 'INGEN_VERDI';
    const servicegruppeOrIVURD = servicegruppe ? servicegruppe : 'IVURD';

    const POAGruppe = getPoaGroup({
        dinSituasjon,
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        innsatsgruppe: foreslattInnsatsgruppeOrIngenVerdi,
        alder,
        servicegruppe: servicegruppeOrIVURD,
        opprettetRegistreringDato,
    });
    const ukerRegistrert = opprettetRegistreringDato ? ukerFraDato(opprettetRegistreringDato) : ukerFraDato(new Date());

    /*
        Funksjon hvor man bygger opp kriterier for et eksperiment og retunerer true/false
        ettersom brukeren kommer inn under eksperimentet eller ei
    */
    const hotjarEksperiment = () => {
        return POAGruppe === 'kss' && ukerRegistrert < 4;
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
        setIdentifyPoaGruppe(POAGruppe);
        tellPoaGruppe(amplitudeAktivitetsData);
        loggAktivitet({ aktivitet: 'Viser veien til arbeid', ...amplitudeAktivitetsData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tilbakeTilSammeArbeidsgiver =
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING;

    const visRessurslenker = !(tilbakeTilSammeArbeidsgiver && erSykmeldtMedArbeidsgiver);

    const egenvurderingsbesvarelseValid = (): boolean => {
        let isValid = false;
        if (opprettetRegistreringDato && egenvurderingbesvarelseDato) {
            isValid = opprettetRegistreringDato <= egenvurderingbesvarelseDato;
        }
        return isValid;
    };

    const skalViseEgenvurderingLenke =
        dinSituasjon !== 'ER_PERMITTERT' &&
        oppfolgingData.servicegruppe === Servicegruppe.IVURD &&
        (!harEgenvurderingbesvarelse || !egenvurderingsbesvarelseValid()) &&
        opprettetRegistreringDato !== null &&
        opprettetRegistreringDato >= LANSERINGSDATO_EGENVURDERING &&
        !oppfolgingData.reservasjonKRR &&
        (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
            foreslattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS);

    return (
        <InnholdView
            skalViseEgenvurderingLenke={skalViseEgenvurderingLenke}
            visRessurslenker={visRessurslenker}
            skalViseIARBSPlaster={skalViseIARBSPlaster}
        />
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.data !== null,
    egenvurderingbesvarelseDato: state.egenvurderingbesvarelse.data
        ? new Date(state.egenvurderingbesvarelse.data.sistOppdatert)
        : null,
});

export default connect(mapStateToProps)(InnholdLogikkNiva4);
