import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import IkkeArbeidssokerInnhold from './ikke-arbeidssoker-innhold';

function Innhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const harAktivArbeidssokerperiode = arbeidssokerperioder.harAktivArbeidssokerperiode === 'Ja';
    return harAktivArbeidssokerperiode ? <ArbeidssokerInnhold /> : <IkkeArbeidssokerInnhold />;
}

export default Innhold;
