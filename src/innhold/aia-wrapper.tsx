import AiaTabs from '../tabs/aia-tabs';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import useSkalBrukeTabs from '../hooks/use-skal-bruke-tabs';
import { MeldepliktProvider } from '../contexts/meldeplikt';
import { ReaktiveringProvider } from '../contexts/reaktivering';
import { BesvarelseProvider } from '../contexts/besvarelse';
import ArbeidssokerDataProvider from './arbeidssoker-data-provider';

function AiaWrapper() {
    const brukTabs = useSkalBrukeTabs();

    return (
        <ArbeidssokerDataProvider>
            <MeldepliktProvider>
                <ReaktiveringProvider>
                    <BesvarelseProvider>
                        <div id="aia-wrapper">{brukTabs ? <AiaTabs /> : <ArbeidssokerInnhold />}</div>
                    </BesvarelseProvider>
                </ReaktiveringProvider>
            </MeldepliktProvider>
        </ArbeidssokerDataProvider>
    );
}

export default AiaWrapper;
