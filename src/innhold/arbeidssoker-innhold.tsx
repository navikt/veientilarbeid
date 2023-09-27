import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';
import { useBrukerregistreringData } from '../contexts/brukerregistrering';
import { useOppfolgingData } from '../contexts/oppfolging';

import InnholdStandard from './innhold-standard';
import InnholdArbeidssokerForenklet from './innhold-arbeidssoker-forenklet';
import InnholdSituasjonsbestemt from './innhold-situasjonsbestemt';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../lib/er-situasjonsbestemt-innsatsgruppe';
import useErStandardInnsats from '../hooks/use-er-standard-innsats';
import { useSWRImmutable } from '../hooks/useSWR';
import { ARBEIDSOKER_INNHOLD } from '../ducks/api';

function ArbeidssokerInnhold() {
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const { data } = useSWRImmutable(ARBEIDSOKER_INNHOLD);

    console.log('ArbeidssokerInnhold data: ', data);
    const innloggingsnivaa = useAutentiseringData().securityLevel;
    const brukerregistreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const brukerregistreringDataEllerNull = brukerregistreringData?.registrering ?? null;
    const erSituasjonbestemt = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData: brukerregistreringDataEllerNull,
        oppfolgingData,
    });
    const { erStandardInnsats, error } = useErStandardInnsats();

    if (erStandardInnsats === undefined && !error) return null;

    if (underOppfolging && innloggingsnivaa === InnloggingsNiva.LEVEL_4 && erStandardInnsats) {
        return <InnholdStandard />;
    }

    if (underOppfolging && innloggingsnivaa === InnloggingsNiva.LEVEL_4 && erSituasjonbestemt) {
        return <InnholdSituasjonsbestemt />;
    }

    return <InnholdArbeidssokerForenklet />;
}

export default ArbeidssokerInnhold;
