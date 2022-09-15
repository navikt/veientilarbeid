import { useArbeidssokerPerioder, useUnderOppfolging } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import IkkeArbeidssokerInnhold from './ikke-arbeidssoker-innhold';
import ArbeidssokerDataProvider from './arbeidssoker-data-provider';

function Innhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const underOppfolgingData = useUnderOppfolging();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const erArbeidssoker =
        arbeidssokerperioder.harAktivArbeidssokerperiode === 'Ja' || underOppfolgingData?.underoppfolging;

    return erArbeidssoker ? (
        <ArbeidssokerDataProvider>
            <ArbeidssokerInnhold />
        </ArbeidssokerDataProvider>
    ) : (
        <IkkeArbeidssokerInnhold />
    );
}

export default Innhold;
