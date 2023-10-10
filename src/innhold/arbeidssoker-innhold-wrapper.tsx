import Feilmelding from '../komponenter/feilmeldinger/feilmelding';
import styles from '../komponenter/innholdslaster/innholdslaster.module.css';
import { Loader } from '@navikt/ds-react';
import { useArbeidssokerData } from '../hooks/use-arbeidssoker-data';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function ArbeidssokerInnholdWrapper({ children }: Props) {
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
    return children;
}

export default ArbeidssokerInnholdWrapper;
