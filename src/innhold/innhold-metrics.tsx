import * as React from 'react';
import { AmplitudeContext } from '../ducks/amplitude-context';
import {
    BrukerregistreringContext,
    selectDinSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato,
} from '../context/brukerregistrering';
import { OppfolgingContext } from '../context/oppfolging';
import { BrukerInfoContext } from '../context/bruker-info';
import getPoaGroup from '../utils/get-poa-group';
import { loggVisning } from '../metrics/metrics';
import { erMikrofrontend } from '../utils/app-state-utils';
import { hotjarTrigger } from '../hotjar';
import { AutentiseringContext, InnloggingsNiva } from '../ducks/autentisering';
import { UnderOppfolgingContext } from '../ducks/under-oppfolging';
import sjekkOmBrukerErStandardInnsatsgruppe from '../lib/er-standard-innsatsgruppe';

type Props = {};

export default function InnholdMetrics() {
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    if (!underOppfolging || securityLevel === InnloggingsNiva.LEVEL_3) return null;

    return <Metrics />;
}

function Metrics(props: Props) {
    const { data: oppfolgingData } = React.useContext(OppfolgingContext);
    const { formidlingsgruppe, servicegruppe } = oppfolgingData;
    const amplitudeData = React.useContext(AmplitudeContext);
    const { ukerRegistrert } = amplitudeData;
    const registreringData = React.useContext(BrukerregistreringContext).data;
    const { alder } = React.useContext(BrukerInfoContext).data;

    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(registreringData);
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(registreringData);

    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;

    const foreslattInnsatsgruppeOrIngenVerdi = foreslattInnsatsgruppe ? foreslattInnsatsgruppe : 'INGEN_VERDI';
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe ? formidlingsgruppe : 'INGEN_VERDI';
    const servicegruppeOrIVURD = servicegruppe ? servicegruppe : 'IVURD';

    const dinSituasjon = selectDinSituasjonSvar(registreringData);

    const POAGruppe = getPoaGroup({
        dinSituasjon,
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        innsatsgruppe: foreslattInnsatsgruppeOrIngenVerdi,
        alder,
        servicegruppe: servicegruppeOrIVURD,
        opprettetRegistreringDato,
    });

    const hotjarEksperiment = () => {
        // Henter data fra amplitude
        const brukerregistreringData = registreringData?.registrering ?? null;
        const erInnenfor12ukerRegistrert = ukerRegistrert !== 'INGEN_DATO' && ukerRegistrert <= 12;
        const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({
            brukerregistreringData,
            oppfolgingData,
        });
        return erInnenfor12ukerRegistrert && erStandardInnsatsgruppe;
    };

    React.useEffect(() => {
        hotjarTrigger(erMikrofrontend(), POAGruppe, hotjarEksperiment());
        loggVisning({ viser: 'Viser veien til arbeid', ...amplitudeData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
