import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';
import InnholdStandard from './innhold-standard';
import InnholdIkkeStandard from './innhold-ikke-standard';
import useSwr from 'swr';
import { ER_STANDARD_INNSATSGRUPPE_URL } from '../ducks/api';

function ArbeidssokerInnhold() {
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const innloggingsnivaa = useAutentiseringData().securityLevel;
    const { data: erStandard } = useSwr(ER_STANDARD_INNSATSGRUPPE_URL);

    if (underOppfolging && innloggingsnivaa === InnloggingsNiva.LEVEL_4 && erStandard) {
        return <InnholdStandard />;
    }

    return <InnholdIkkeStandard />;
}

export default ArbeidssokerInnhold;
