import { useFeatureToggleData } from '../contexts/feature-toggles';
import { useBesvarelse } from '../contexts/besvarelse';
import { visBesvarelser } from '../lib/vis-besvarelse';
import { useBrukerregistreringData } from '../contexts/brukerregistrering';
import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import { useBrukerinfoData } from '../contexts/bruker-info';
import { useOppfolgingData } from '../contexts/oppfolging';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';

function useSkalBrukeTabs() {
    const featuretoggleData = useFeatureToggleData();
    const brukTabs = featuretoggleData['aia.bruk-tabs-demo'];
    const registreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const brukerInfoData = useBrukerinfoData();
    const { besvarelse } = useBesvarelse();
    const oppfolgingData = useOppfolgingData();
    const beregnedeArbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperiodeData);

    const visEndreSituasjon = visBesvarelser({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        featuretoggleData,
        besvarelseData: besvarelse,
        arbeidssokerPeriodeData: beregnedeArbeidssokerperioder,
    });

    return brukTabs && visEndreSituasjon;
}

export default useSkalBrukeTabs;
