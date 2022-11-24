import * as React from 'react';
import { useAmplitudeData } from '../contexts/amplitude-context';
import {
    selectDinSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato,
    useBrukerregistreringData,
} from '../contexts/brukerregistrering';
import { useOppfolgingData } from '../contexts/oppfolging';
import { useBrukerinfoData } from '../contexts/bruker-info';
import getPoaGroup from '../utils/get-poa-group';
import { loggVisning } from '../metrics/metrics';
import { erMikrofrontend } from '../utils/app-state-utils';
import { hotjarTrigger } from '../hotjar';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';
import sjekkOmBrukerErStandardInnsatsgruppe from '../lib/er-standard-innsatsgruppe';
import { useUnderOppfolging } from '../contexts/arbeidssoker';

type Props = {};

export default function InnholdMetrics() {
    const { securityLevel } = useAutentiseringData();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;

    if (!underOppfolging || securityLevel === InnloggingsNiva.LEVEL_3) return null;

    return <Metrics />;
}

function Metrics(props: Props) {
    const oppfolgingData = useOppfolgingData();
    const { formidlingsgruppe, servicegruppe, kanReaktiveres } = oppfolgingData;

    const { amplitudeData } = useAmplitudeData();

    const registreringData = useBrukerregistreringData();
    const { alder } = useBrukerinfoData();

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
        const brukerregistreringData = registreringData?.registrering ?? null;
        const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({
            brukerregistreringData,
            oppfolgingData,
        });
        return erStandardInnsatsgruppe && kanReaktiveres;
    };

    React.useEffect(() => {
        hotjarTrigger(erMikrofrontend(), POAGruppe, hotjarEksperiment());
        loggVisning({ viser: 'Viser AiA', ...amplitudeData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
