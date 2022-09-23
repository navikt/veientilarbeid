import { useArbeidssokerPerioder, useUnderOppfolging } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import IkkeRegistrert from '../komponenter/ikke-registrert/ikke-registrert';
import ReaktiveringWrapper from '../komponenter/reaktivering/reaktivering-wrapper';
import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import InnholdIkkeStandard from './innhold-ikke-standard';

function IkkeArbeidssokerInnhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);

    if (arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode < 28) {
        return <ReaktiveringWrapper />;
    } else if (underOppfolging) {
        return (
            <ArbeidssokerDataProvider>
                <InnholdIkkeStandard />
            </ArbeidssokerDataProvider>
        );
    }

    return <IkkeRegistrert />;
}

export default IkkeArbeidssokerInnhold;
