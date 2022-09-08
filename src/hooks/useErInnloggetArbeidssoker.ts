import { useOppfolgingData } from '../contexts/oppfolging';
import { useAutentiseringData } from '../contexts/autentisering';
import { erInnloggetArbeidssoker } from '../lib/er-innlogget-arbeidssoker';
import { useArbeidssoker } from '../contexts/arbeidssoker';

const useErInnloggetArbeidssoker = () => {
    const oppfolgingData = useOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const arbeidssokerData = useArbeidssoker();
    const underOppfolging = arbeidssokerData?.underoppfolging.underoppfolging;

    const kanViseKomponent = erInnloggetArbeidssoker({ oppfolgingData, autentiseringData, underOppfolging });

    return kanViseKomponent;
};

export default useErInnloggetArbeidssoker;
