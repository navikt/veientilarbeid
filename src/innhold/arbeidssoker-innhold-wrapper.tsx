import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import { MeldepliktProvider } from '../contexts/meldeplikt';

function ArbeidssokerInnholdWrapper() {
    return (
        <ArbeidssokerDataProvider>
            <MeldepliktProvider>
                <ArbeidssokerInnhold />
            </MeldepliktProvider>
        </ArbeidssokerDataProvider>
    );
}

export default ArbeidssokerInnholdWrapper;
