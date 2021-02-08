import * as React from 'react';
import handleViewport from 'react-in-viewport';
import { AmplitudeContext } from '../ducks/amplitude-context';
import {
    BrukerregistreringContext,
    selectDinSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar,
    selectOpprettetRegistreringDato,
} from '../ducks/brukerregistrering';
import { OppfolgingContext } from '../ducks/oppfolging';
import { BrukerInfoContext } from '../ducks/bruker-info';
import getPoaGroup from '../utils/get-poa-group';
import { loggAktivitet, setIdentifyPoaGruppe, seVeientilarbeid, tellPoaGruppe } from '../metrics/metrics';
import { erMikrofrontend } from '../utils/app-state-utils';
import { hotjarTrigger } from '../hotjar';
import { AutentiseringContext, InnloggingsNiva } from '../ducks/autentisering';
import { UnderOppfolgingContext } from '../ducks/under-oppfolging';

interface ViewportProps {
    inViewport: boolean;
    forwardedRef: React.ForwardedRef<any>;
}

type Props = {};

const WrappedMetrics: React.ComponentType<Props> = handleViewport(Metrics);

export default function InnholdMetrics() {
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    if (!underOppfolging || securityLevel === InnloggingsNiva.LEVEL_3) return null;

    return <WrappedMetrics />;
}

function Metrics(props: Props & ViewportProps) {
    const [harVistTilBruker, setHarVistTilBruker] = React.useState<boolean>(false);
    const { formidlingsgruppe, servicegruppe, reservasjonKRR } = React.useContext(OppfolgingContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const amplitudeAktivitetsData = React.useContext(AmplitudeContext);
    const { antallDagerFraPeriodeslutt } = amplitudeAktivitetsData;
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
        // Henter data fra amplitude, antallDagerFraPeriodeslutt er egentlig antallDagerEtterFastsattMeldedag (mandag = 0)
        return parseInt(antallDagerFraPeriodeslutt, 10) >= 1;
    };

    if (props.inViewport && !harVistTilBruker) {
        setHarVistTilBruker(true);
    }

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

    React.useEffect(() => {
        if (harVistTilBruker) {
            loggAktivitet({ aktivitet: 'Veien til arbeid i viewport', ...amplitudeAktivitetsData });
        }
    }, [amplitudeAktivitetsData, harVistTilBruker]);

    return <span ref={props.forwardedRef}></span>;
}
