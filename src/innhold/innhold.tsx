import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import IkkeArbeidssokerInnhold from './ikke-arbeidssoker-innhold';
import ArbeidssokerDataProvider from './arbeidssoker-data-provider';

function Innhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const harAktivArbeidssokerperiode = arbeidssokerperioder.harAktivArbeidssokerperiode === 'Ja';

    return harAktivArbeidssokerperiode ? (
        <ArbeidssokerDataProvider>
            <ArbeidssokerInnhold />
        </ArbeidssokerDataProvider>
    ) : (
        <IkkeArbeidssokerInnhold />
    );
}

export default Innhold;
