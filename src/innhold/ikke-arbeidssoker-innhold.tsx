import { useArbeidssokerPerioder, useUnderOppfolging } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import IkkeRegistrert from '../komponenter/ikke-registrert/ikke-registrert';
import ReaktiveringWrapper from '../komponenter/reaktivering/reaktivering-wrapper';
import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import InnholdUnderOppfolgingUtenPeriode from './innhold-under-oppfolging-uten-periode';

function IkkeArbeidssokerInnhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);

    return (
        <>
            {arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode < 28 && <ReaktiveringWrapper />}
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
