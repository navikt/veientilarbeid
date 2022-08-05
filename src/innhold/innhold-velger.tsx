import { useBrukerregistreringData } from '../contexts/brukerregistrering';
import { useOppfolgingData } from '../contexts/oppfolging';
import sjekkOmBrukerErStandardInnsatsgruppe from '../lib/er-standard-innsatsgruppe';
import InnholdStandard from './innhold-standard';
import InnholdIkkeStandard from './innhold-ikke-standard';

function InnholdVelger() {
    const oppfolgingData = useOppfolgingData();
    const registreringData = useBrukerregistreringData();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    return erStandardInnsatsgruppe ? <InnholdStandard /> : <InnholdIkkeStandard />;
}

export default InnholdVelger;
