import * as React from 'react';
import { AmplitudeAktivitetContext } from '../ducks/amplitude-aktivitet-context';
import {
    BrukerregistreringContext,
    selectDinSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar,
    selectOpprettetRegistreringDato,
} from '../ducks/brukerregistrering';
import { OppfolgingContext } from '../ducks/oppfolging';
import { BrukerInfoContext } from '../ducks/bruker-info';
import ukerFraDato from '../utils/uker-fra-dato';
import getPoaGroup from '../utils/get-poa-group';
import { loggAktivitet, setIdentifyPoaGruppe, seVeientilarbeid, tellPoaGruppe } from '../metrics/metrics';
import { erMikrofrontend } from '../utils/app-state-utils';
import { hotjarTrigger } from '../hotjar';
import { AutentiseringContext, InnloggingsNiva } from '../ducks/autentisering';
import { UnderOppfolgingContext } from '../ducks/under-oppfolging';

export default function InnholdMetrics() {
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    if (!underOppfolging || securityLevel === InnloggingsNiva.LEVEL_3) return null;

    return <Metrics />;
}

function Metrics() {
    const { formidlingsgruppe, servicegruppe, reservasjonKRR } = React.useContext(OppfolgingContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const { erSykmeldtMedArbeidsgiver, registreringType, rettighetsgruppe, alder } = React.useContext(
        BrukerInfoContext
    ).data;

    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(brukerregistreringData);
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(brukerregistreringData);
    const fremtidigSvar = selectFremtidigSituasjonSvar(brukerregistreringData);

    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;

    const registreringTypeOrIngenVerdi = registreringType ? registreringType : 'INGEN_VERDI';
    const foreslattInnsatsgruppeOrIngenVerdi = foreslattInnsatsgruppe ? foreslattInnsatsgruppe : 'INGEN_VERDI';
    const fremtidigSvarOrIngenVerdi = fremtidigSvar ? fremtidigSvar : 'INGEN_VERDI';
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe ? formidlingsgruppe : 'INGEN_VERDI';
    const servicegruppeOrIVURD = servicegruppe ? servicegruppe : 'IVURD';

    const ukerRegistrert = opprettetRegistreringDato ? ukerFraDato(opprettetRegistreringDato) : ukerFraDato(new Date());

    const dinSituasjon = selectDinSituasjonSvar(brukerregistreringData) || 'INGEN_VERDI';
    const underOppfolgingJaNei = underOppfolging ? 'ja' : 'nei';
    const reservasjonKRRJaNei = reservasjonKRR ? 'ja' : 'nei';

    const POAGruppe = getPoaGroup({
        dinSituasjon,
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        innsatsgruppe: foreslattInnsatsgruppeOrIngenVerdi,
        alder,
        servicegruppe: servicegruppeOrIVURD,
        opprettetRegistreringDato,
    });

    const hotjarEksperiment = () => {
        return POAGruppe === 'kss' && ukerRegistrert >= 8 && ukerRegistrert < 12;
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
        setIdentifyPoaGruppe(POAGruppe);
        tellPoaGruppe(amplitudeAktivitetsData);
        loggAktivitet({ aktivitet: 'Viser veien til arbeid', ...amplitudeAktivitetsData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
