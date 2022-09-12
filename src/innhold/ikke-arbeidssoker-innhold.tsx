import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import IkkeRegistrert from '../komponenter/ikke-registrert/ikke-registrert';
import Reaktivering from '../komponenter/reaktivering/reaktivering';

function IkkeArbeidssokerInnhold() {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);

    if (arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode < 28) {
        return <Reaktivering />;
    }

    return <IkkeRegistrert />;
}

export default IkkeArbeidssokerInnhold;
