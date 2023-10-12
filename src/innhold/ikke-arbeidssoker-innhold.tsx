import { useArbeidssokerPerioder, useUnderOppfolging } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import IkkeRegistrert from '../komponenter/ikke-registrert/ikke-registrert';
import ReaktiveringWrapper from '../komponenter/reaktivering/reaktivering-wrapper';
import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import InnholdUnderOppfolgingUtenPeriode from './innhold-under-oppfolging-uten-periode';
import { KAN_REAKTIVERES_URL } from '../ducks/api';
import { useSWRImmutable } from '../hooks/useSWR';

function IkkeArbeidssokerInnhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const { data: kanReaktiveresData } = useSWRImmutable<{ kanReaktiveres: Boolean }>(KAN_REAKTIVERES_URL);
    const mindreEnn28DagerSidenSisteArbeidssokerPeriode =
        Number(arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode) < 28;
    const kanReaktiveres = kanReaktiveresData?.kanReaktiveres;

    return (
        <>
            {mindreEnn28DagerSidenSisteArbeidssokerPeriode && !underOppfolging && kanReaktiveres && (
                <ReaktiveringWrapper />
            )}
            {underOppfolging ? (
                <ArbeidssokerDataProvider>
                    <InnholdUnderOppfolgingUtenPeriode />
                </ArbeidssokerDataProvider>
            ) : (
                <IkkeRegistrert />
            )}
        </>
    );
}

export default IkkeArbeidssokerInnhold;
