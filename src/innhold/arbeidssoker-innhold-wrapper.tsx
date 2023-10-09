import ArbeidssokerDataProvider from './arbeidssoker-data-provider';
import { MeldepliktProvider } from '../contexts/meldeplikt';
import { ReaktiveringProvider } from '../contexts/reaktivering';
import { BesvarelseProvider } from '../contexts/besvarelse';
import AiaWrapper from './aia-wrapper';
import Feilmelding from '../komponenter/feilmeldinger/feilmelding';
import styles from '../komponenter/innholdslaster/innholdslaster.module.css';
import { Loader } from '@navikt/ds-react';
import { useArbeidssokerData } from '../hooks/use-arbeidssoker-data';

function ArbeidssokerInnholdWrapper() {
    const { isLoading, error } = useArbeidssokerData();
    if (error) {
        return <Feilmelding />;
    }
    if (isLoading) {
        return (
            <div className={styles.innholdslasterLaster}>
                <Loader transparent size="2xlarge" />
            </div>
        );
    }
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
