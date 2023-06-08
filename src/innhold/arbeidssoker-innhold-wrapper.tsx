import { useFeatureToggleData } from '../contexts/feature-toggles';

import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import AiaTabs from '../tabs/aia-tabs';
import { MeldepliktProvider } from '../contexts/meldeplikt';
import { ReaktiveringProvider } from '../contexts/reaktivering';
import { BesvarelseProvider } from '../contexts/besvarelse';

function ArbeidssokerInnholdWrapper() {
    const featureToggles = useFeatureToggleData();
    const brukTabs = featureToggles['aia.bruk-tabs-demo'];

    return (
        <ArbeidssokerDataProvider>
            <MeldepliktProvider>
                <ReaktiveringProvider>
                    <BesvarelseProvider>
                        <div id={'aia-wrapper'}>{brukTabs ? <AiaTabs /> : <ArbeidssokerInnhold />}</div>
                    </BesvarelseProvider>
                </ReaktiveringProvider>
            </MeldepliktProvider>
        </ArbeidssokerDataProvider>
    );
}

export default ArbeidssokerInnholdWrapper;
