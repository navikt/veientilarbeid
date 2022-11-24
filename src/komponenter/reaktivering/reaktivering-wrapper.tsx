import Reaktivering from './reaktivering';
import { ProfilProvider } from '../../contexts/profil';
import { MeldepliktProvider } from '../../contexts/meldeplikt';
import { DagpengerStatusProvider } from '../../contexts/dagpenger-status';
import { AmplitudeProvider } from '../hent-initial-data/amplitude-provider';

const ReaktiveringWrapper = () => {
    return (
        <ProfilProvider>
            <MeldepliktProvider>
                <DagpengerStatusProvider>
                    <AmplitudeProvider>
                        <DagpengerStatusProvider>
                            <Reaktivering />
                        </DagpengerStatusProvider>
                    </AmplitudeProvider>
                </DagpengerStatusProvider>
            </MeldepliktProvider>
        </ProfilProvider>
    );
};

export default ReaktiveringWrapper;
