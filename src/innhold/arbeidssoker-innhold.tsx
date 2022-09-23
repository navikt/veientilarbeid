import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';
import InnholdStandard from './innhold-standard';
import InnholdIkkeStandard from './innhold-ikke-standard';
import { ER_STANDARD_INNSATSGRUPPE_URL } from '../ducks/api';
import { useSWRImmutable } from '../hooks/useSWR';
import { Suspense } from 'react';

function ArbeidssokerInnhold() {
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const innloggingsnivaa = useAutentiseringData().securityLevel;
    const { data: erStandard } = useSWRImmutable(ER_STANDARD_INNSATSGRUPPE_URL, { suspense: true });

    const visStandard = underOppfolging && innloggingsnivaa === InnloggingsNiva.LEVEL_4 && erStandard;

    return <Suspense>{visStandard ? <InnholdStandard /> : <InnholdIkkeStandard />}</Suspense>;
}

export default ArbeidssokerInnhold;
