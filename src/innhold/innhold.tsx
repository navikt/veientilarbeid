import { useBrukerregistreringData } from '../contexts/brukerregistrering';
import { useOppfolgingData } from '../contexts/oppfolging';
import sjekkOmBrukerErStandardInnsatsgruppe from '../lib/er-standard-innsatsgruppe';
import InnholdStandard from './innhold-standard';
import InnholdIkkeStandard from './innhold-ikke-standard';
import IkkeRegistrert from '../komponenter/ikke-registrert/ikke-registrert';
import { useArbeidssoker } from '../contexts/arbeidssoker';

function RegistrertInnhold() {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });
    return erStandardInnsatsgruppe ? <InnholdStandard /> : <InnholdIkkeStandard />;
}

function Innhold() {
    const arbeidssoker = useArbeidssoker();
    const underOppfolging = arbeidssoker?.underoppfolging.underoppfolging;

    return underOppfolging ? <RegistrertInnhold /> : <IkkeRegistrert />;
}

export default Innhold;
