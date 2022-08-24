import { useContext } from 'react';

import GenerelleFliser from '../komponenter/dittnav/generelle-fliser';
import { useBrukerregistreringData } from '../contexts/brukerregistrering';
import { useOppfolgingData } from '../contexts/oppfolging';
import sjekkOmBrukerErStandardInnsatsgruppe from '../lib/er-standard-innsatsgruppe';
import InnholdStandard from './innhold-standard';
import InnholdIkkeStandard from './innhold-ikke-standard';
import { UnderOppfolgingContext } from '../contexts/under-oppfolging';

function InnholdVelger() {
    const oppfolgingData = useOppfolgingData();
    const registreringData = useBrukerregistreringData();
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    if (!underOppfolging) return null;
    return erStandardInnsatsgruppe ? <InnholdStandard /> : <InnholdIkkeStandard />;
}

function Innhold() {
    return (
        <>
            <InnholdVelger />
            <GenerelleFliser />
        </>
    );
}

export default Innhold;
