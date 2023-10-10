import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';

import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import IkkeArbeidssokerInnhold from './ikke-arbeidssoker-innhold';
import ArbeidssokerInnholdWrapper from './arbeidssoker-innhold-wrapper';
import AiaWrapper from './aia-wrapper';

function Innhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const harAktivArbeidssokerperiode = arbeidssokerperioder.harAktivArbeidssokerperiode === 'Ja';

    return (
        <ArbeidssokerInnholdWrapper>
            {harAktivArbeidssokerperiode ? <AiaWrapper /> : <IkkeArbeidssokerInnhold />}
        </ArbeidssokerInnholdWrapper>
    );
}

export default Innhold;
