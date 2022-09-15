import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import ArbeidssokerInnhold from './arbeidssoker-innhold';

function ArbeidssokerInnholdWrapper() {
    return (
        <ArbeidssokerDataProvider>
            <ArbeidssokerInnhold />
        </ArbeidssokerDataProvider>
    );
}

export default ArbeidssokerInnholdWrapper;
