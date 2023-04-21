import { useFeatureToggleData } from '../contexts/feature-toggles';

import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import TabsDemo from '../tabs-demo/tabs-demo';
import { MeldepliktProvider } from '../contexts/meldeplikt';
import { ReaktiveringProvider } from '../contexts/reaktivering';

function ArbeidssokerInnholdWrapper() {
    const featureToggles = useFeatureToggleData();
    const brukTabsDemo = featureToggles['aia.bruk-tabs-demo'];

    return (
        <ArbeidssokerDataProvider>
            <MeldepliktProvider>
                <ReaktiveringProvider>{brukTabsDemo ? <TabsDemo /> : <ArbeidssokerInnhold />}</ReaktiveringProvider>
            </MeldepliktProvider>
        </ArbeidssokerDataProvider>
    );
}

export default ArbeidssokerInnholdWrapper;
