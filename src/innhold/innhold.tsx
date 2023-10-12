import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';

import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import IkkeArbeidssokerInnhold from './ikke-arbeidssoker-innhold';
import AiaWrapper from './aia-wrapper';
import ArbeidssokerDataProvider from './arbeidssoker-data-provider';

function Innhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const harAktivArbeidssokerperiode = arbeidssokerperioder.harAktivArbeidssokerperiode === 'Ja';

    return (
        <>
            {harAktivArbeidssokerperiode ? (
                <ArbeidssokerDataProvider>
                    <AiaWrapper />
                </ArbeidssokerDataProvider>
            ) : (
                <IkkeArbeidssokerInnhold />
            )}
        </>
    );
}

export default Innhold;
