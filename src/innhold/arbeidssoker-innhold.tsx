import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';
import { useSWRImmutable } from '../hooks/useSWR';
import { useBrukerregistreringData } from '../contexts/brukerregistrering';
import { useOppfolgingData } from '../contexts/oppfolging';

import InnholdStandard from './innhold-standard';
import InnholdIkkeStandard from './innhold-ikke-standard';
import InnholdSituasjonsbestemt from './innhold-situasjonsbestemt';
import { ER_STANDARD_INNSATSGRUPPE_URL } from '../ducks/api';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../lib/er-situasjonsbestemt-innsatsgruppe';

function ArbeidssokerInnhold() {
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const innloggingsnivaa = useAutentiseringData().securityLevel;
    const { data: erStandard, error } = useSWRImmutable(ER_STANDARD_INNSATSGRUPPE_URL);
    const brukerregistreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const brukerregistreringDataEllerNull = brukerregistreringData?.registrering ?? null;
    const erSituasjonbestemt = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData: brukerregistreringDataEllerNull,
        oppfolgingData,
    });

    if (erStandard === undefined && !error) return null;

    if (underOppfolging && innloggingsnivaa === InnloggingsNiva.LEVEL_4 && erStandard) {
        return <InnholdStandard />;
    }

    if (underOppfolging && innloggingsnivaa === InnloggingsNiva.LEVEL_4 && erSituasjonbestemt) {
        return <InnholdSituasjonsbestemt />;
    }

    return <InnholdIkkeStandard />;
}

export default ArbeidssokerInnhold;
