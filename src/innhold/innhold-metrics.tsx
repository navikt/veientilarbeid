import * as React from 'react';
import { AmplitudeContext } from '../ducks/amplitude-context';
import {
    BrukerregistreringContext,
    selectDinSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato,
} from '../ducks/brukerregistrering';
import { OppfolgingContext } from '../ducks/oppfolging';
import { BrukerInfoContext } from '../ducks/bruker-info';
import getPoaGroup from '../utils/get-poa-group';
import { loggVisning } from '../metrics/metrics';
import { erMikrofrontend } from '../utils/app-state-utils';
import { hotjarTrigger } from '../hotjar';
import { AutentiseringContext, InnloggingsNiva } from '../ducks/autentisering';
import { UnderOppfolgingContext } from '../ducks/under-oppfolging';

type Props = {};

export default function InnholdMetrics() {
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    if (!underOppfolging || securityLevel === InnloggingsNiva.LEVEL_3) return null;

    return <Metrics />;
}

function Metrics(props: Props) {
    const { formidlingsgruppe, servicegruppe } = React.useContext(OppfolgingContext).data;
    const amplitudeData = React.useContext(AmplitudeContext);
    const { ukerRegistrert, eksperimenter } = amplitudeData;
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const { alder } = React.useContext(BrukerInfoContext).data;

    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(brukerregistreringData);
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(brukerregistreringData);

    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;

    const foreslattInnsatsgruppeOrIngenVerdi = foreslattInnsatsgruppe ? foreslattInnsatsgruppe : 'INGEN_VERDI';
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe ? formidlingsgruppe : 'INGEN_VERDI';
    const servicegruppeOrIVURD = servicegruppe ? servicegruppe : 'IVURD';

    const dinSituasjon = selectDinSituasjonSvar(brukerregistreringData);

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
        const erInnenfor0til11ukerRegistrert =
            ukerRegistrert !== 'INGEN_DATO' && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(ukerRegistrert);
        const deltarIeksperimentGruppen = eksperimenter.includes('onboarding14a');
        const erKSS = POAGruppe === 'kss';
        return erInnenfor0til11ukerRegistrert && deltarIeksperimentGruppen && erKSS;
    };

    React.useEffect(() => {
        hotjarTrigger(erMikrofrontend(), POAGruppe, hotjarEksperiment());
        loggVisning({ viser: 'Viser veien til arbeid', ...amplitudeData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
