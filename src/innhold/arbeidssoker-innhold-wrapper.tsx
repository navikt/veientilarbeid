import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import { MeldepliktProvider } from '../contexts/meldeplikt';
import { ReaktiveringProvider } from '../contexts/reaktivering';
import { BesvarelseProvider } from '../contexts/besvarelse';
import AiaWrapper from './aia-wrapper';

function ArbeidssokerInnholdWrapper() {
    return (
        <ArbeidssokerDataProvider>
            <MeldepliktProvider>
                <ReaktiveringProvider>
                    <BesvarelseProvider>
                        <AiaWrapper />
                    </BesvarelseProvider>
                </ReaktiveringProvider>
            </MeldepliktProvider>
        </ArbeidssokerDataProvider>
    );
}

export default ArbeidssokerInnholdWrapper;
