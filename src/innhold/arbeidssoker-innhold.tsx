import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';
import InnholdStandard from './innhold-standard';
import InnholdIkkeStandard from './innhold-ikke-standard';
import { ER_STANDARD_INNSATSGRUPPE_URL } from '../ducks/api';
import { useSWRImmutable } from '../hooks/useSWR';

function ArbeidssokerInnhold() {
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const innloggingsnivaa = useAutentiseringData().securityLevel;
    const { data: erStandard } = useSWRImmutable(ER_STANDARD_INNSATSGRUPPE_URL);

    console.log(
        'aia <ArbeidssokerInnhold> underOppfolging, innloggingsnivaa, erStandard',
        underOppfolging,
        innloggingsnivaa,
        erStandard
    );

    if (underOppfolging && innloggingsnivaa === InnloggingsNiva.LEVEL_4 && erStandard) {
        return <InnholdStandard />;
    }

    return <InnholdIkkeStandard />;
}

export default ArbeidssokerInnhold;
