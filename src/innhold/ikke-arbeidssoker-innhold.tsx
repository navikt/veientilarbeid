import { useArbeidssokerPerioder, useUnderOppfolging } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import IkkeRegistrert from '../komponenter/ikke-registrert/ikke-registrert';
import ReaktiveringWrapper from '../komponenter/reaktivering/reaktivering-wrapper';
import ArbeidssokerInnholdWrapper from './arbeidssoker-innhold-wrapper';

function IkkeArbeidssokerInnhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);

    if (arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode < 28) {
        return <ReaktiveringWrapper />;
    } else if (underOppfolging) {
        return <ArbeidssokerInnholdWrapper />;
    }

    return <IkkeRegistrert />;
}

export default IkkeArbeidssokerInnhold;
