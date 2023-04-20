import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import { useFeatureToggleData } from '../contexts/feature-toggles';

import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import IkkeArbeidssokerInnhold from './ikke-arbeidssoker-innhold';
import ArbeidssokerInnholdWrapper from './arbeidssoker-innhold-wrapper';
import TabsDemo from '../tabs-demo/tabs-demo';

function Innhold() {
    const featureToggles = useFeatureToggleData();
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const harAktivArbeidssokerperiode = arbeidssokerperioder.harAktivArbeidssokerperiode === 'Ja';
    const brukTabsDemo = featureToggles['aia.bruk-tabs-demo'];

    if (brukTabsDemo) return <TabsDemo />;

    return harAktivArbeidssokerperiode ? <ArbeidssokerInnholdWrapper /> : <IkkeArbeidssokerInnhold />;
}

export default Innhold;
