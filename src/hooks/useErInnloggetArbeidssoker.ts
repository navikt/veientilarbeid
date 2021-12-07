import { useOppfolgingData } from '../contexts/oppfolging';
import { useAutentiseringData } from '../contexts/autentisering';
import { useUnderOppfolgingData } from '../contexts/under-oppfolging';
import { erInnloggetArbeidssoker } from '../lib/er-innlogget-arbeidssoker';

const useErInnloggetArbeidssoker = () => {
    const oppfolgingData = useOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const underOppfolgingData = useUnderOppfolgingData();

    const kanViseKomponent = erInnloggetArbeidssoker({ oppfolgingData, autentiseringData, underOppfolgingData });

    return kanViseKomponent;
};

export default useErInnloggetArbeidssoker;
