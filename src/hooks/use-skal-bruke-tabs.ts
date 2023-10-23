import { useFeatureToggleData } from '../contexts/feature-toggles';
import { useBesvarelse } from '../contexts/besvarelse';
import { visBesvarelser } from '../lib/vis-besvarelse';
import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import useErStandardInnsats from './use-er-standard-innsats';
import { useBrukerregistreringData } from './use-brukerregistrering-data';
import { useBrukerInfoData } from './use-brukerinfo-data';
import { useOppfolgingData } from './use-oppfolging-data';
import { useWindowInnerWidth } from '../contexts/window-inner-width';
import { useErStandardBundle } from '../contexts/standard-bundle';

function useSkalBrukeTabsMainBundle() {
    const featuretoggleData = useFeatureToggleData();
    const brukTabs = featuretoggleData['aia.bruk-tabs-demo'];
    const registreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const brukerInfoData = useBrukerInfoData();
    const { besvarelse } = useBesvarelse();
    const oppfolgingData = useOppfolgingData();
    const beregnedeArbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { erStandardInnsats } = useErStandardInnsats();

    const visEndreSituasjon = visBesvarelser({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        featuretoggleData,
        besvarelseData: besvarelse,
        arbeidssokerPeriodeData: beregnedeArbeidssokerperioder,
        erStandardInnsats,
    });

    return brukTabs && visEndreSituasjon;
}

export const MIN_TABS_BREDDE = 666;
export function useSkalBrukeTabs() {
    const featuretoggleData = useFeatureToggleData();
    const toggledPaa = featuretoggleData['aia.bruk-tabs-demo'];
    const { erStandardBundle } = useErStandardBundle();
    const { innerWidth } = useWindowInnerWidth();
    const skalBrukeTabsMainBundle = useSkalBrukeTabsMainBundle();

    if (erStandardBundle) {
        return toggledPaa && innerWidth > MIN_TABS_BREDDE;
    }

    return skalBrukeTabsMainBundle;
}
export default useSkalBrukeTabs;
