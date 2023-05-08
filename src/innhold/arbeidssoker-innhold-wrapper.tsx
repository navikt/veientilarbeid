import { useFeatureToggleData } from '../contexts/feature-toggles';

import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import TabsDemo from '../tabs-demo/tabs-demo';
import { MeldepliktProvider } from '../contexts/meldeplikt';
import { ReaktiveringProvider } from '../contexts/reaktivering';
import { BesvarelseProvider } from '../contexts/besvarelse';

function ArbeidssokerInnholdWrapper() {
    const featureToggles = useFeatureToggleData();
    const brukTabsDemo = featureToggles['aia.bruk-tabs-demo'];

    return (
        <ArbeidssokerDataProvider>
            <MeldepliktProvider>
                <ReaktiveringProvider>
                    <BesvarelseProvider>{brukTabsDemo ? <TabsDemo /> : <ArbeidssokerInnhold />}</BesvarelseProvider>
                </ReaktiveringProvider>
            </MeldepliktProvider>
        </ArbeidssokerDataProvider>
    );
}

export default ArbeidssokerInnholdWrapper;
