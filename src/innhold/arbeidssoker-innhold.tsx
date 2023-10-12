import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';

import InnholdStandard from './innhold-standard';
import InnholdArbeidssokerForenklet from './innhold-arbeidssoker-forenklet';
import InnholdSituasjonsbestemt from './innhold-situasjonsbestemt';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../lib/er-situasjonsbestemt-innsatsgruppe';
import useErStandardInnsats from '../hooks/use-er-standard-innsats';
import { useBrukerregistreringData } from '../hooks/use-brukerregistrering-data';
import { useOppfolgingData } from '../hooks/use-oppfolging-data';

function ArbeidssokerInnhold() {
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
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
