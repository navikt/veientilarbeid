import { ReactNode } from 'react';
import { ProfilProvider } from '../contexts/profil';
import { AmplitudeProvider } from '../komponenter/hent-initial-data/amplitude-provider';
import { BehovForVeiledningProvider } from '../contexts/behov-for-veiledning';
import { DagpengerStatusProvider } from '../contexts/dagpenger-status';
import { useArbeidssokerData } from '../hooks/use-arbeidssoker-data';
import Feilmelding from '../komponenter/feilmeldinger/feilmelding';
import styles from '../komponenter/innholdslaster/innholdslaster.module.css';
import { Loader } from '@navikt/ds-react';
import StandardSkeletons from '../komponenter/innholdslaster/standard-skeletons';

interface Props {
    children: ReactNode;
    erStandard?: boolean;
}

const ArbeidssokerDataProvider = ({ children, erStandard }: Props) => {
    const { isLoading, error } = useArbeidssokerData();
    if (error) {
        return (
            <div className={styles.innholdslasterFeilmelding}>
                <Feilmelding />
            </div>
        );
    }
    if (isLoading) {
        return (
            <>
                {erStandard ? (
                    <StandardSkeletons />
                ) : (
                    <div className={styles.innholdslasterLaster}>
                        <Loader transparent size="2xlarge" />
                    </div>
                )}
            </>
        );
    }

    return (
        <ProfilProvider>
            <BehovForVeiledningProvider>
                <AmplitudeProvider>
                    <DagpengerStatusProvider>{children}</DagpengerStatusProvider>
                </AmplitudeProvider>
            </BehovForVeiledningProvider>
        </ProfilProvider>
    );
};

export default ArbeidssokerDataProvider;
