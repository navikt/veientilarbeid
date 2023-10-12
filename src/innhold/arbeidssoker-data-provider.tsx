import { ReactNode } from 'react';
import { ProfilProvider } from '../contexts/profil';
import { GjelderFraDatoModalProvider } from '../contexts/gjelder-fra-dato-modal';
import { GjelderFraDatoProvider } from '../contexts/gjelder-fra-dato';
import { AmplitudeProvider } from '../komponenter/hent-initial-data/amplitude-provider';
import { BehovForVeiledningProvider } from '../contexts/behov-for-veiledning';
import { DagpengerStatusProvider } from '../contexts/dagpenger-status';
import { useArbeidssokerData } from '../hooks/use-arbeidssoker-data';
import Feilmelding from '../komponenter/feilmeldinger/feilmelding';
import styles from '../innhold/innhold.module.css';
import { Loader } from '@navikt/ds-react';
import StandardSkeletons from '../komponenter/innholdslaster/standard-skeletons';

interface Props {
    children: ReactNode;
    erStandard?: boolean;
}

const ArbeidssokerDataProvider = ({ children, erStandard }: Props) => {
    const { isLoading, error } = useArbeidssokerData();
    if (error) {
        return <Feilmelding />;
    }
    if (isLoading) {
        return (
            <>
                {erStandard ? (
                    <StandardSkeletons />
                ) : (
                    <div className={styles.limit}>
                        <Loader transparent size="2xlarge" />
                    </div>
                )}
            </>
        );
    }

    return (
        <ProfilProvider>
            <BehovForVeiledningProvider>
                <GjelderFraDatoModalProvider>
                    <GjelderFraDatoProvider>
                        <AmplitudeProvider>
                            <DagpengerStatusProvider>{children}</DagpengerStatusProvider>
                        </AmplitudeProvider>
                    </GjelderFraDatoProvider>
                </GjelderFraDatoModalProvider>
            </BehovForVeiledningProvider>
        </ProfilProvider>
    );
};

export default ArbeidssokerDataProvider;
