import Reaktivering from './reaktivering';
import { ProfilProvider } from '../../contexts/profil';
import { MeldepliktProvider } from '../../contexts/meldeplikt';
import { DagpengerStatusProvider } from '../../contexts/dagpenger-status';
import { AmplitudeProvider } from '../hent-initial-data/amplitude-provider';
import { AntattInaktiveringsgrunnProvider } from '../../contexts/antatt-inaktiveringsgrunn';

const ReaktiveringWrapper = () => {
    return (
        <ProfilProvider>
            <AmplitudeProvider>
                <MeldepliktProvider>
                    <DagpengerStatusProvider>
                        <AntattInaktiveringsgrunnProvider>
                            <Reaktivering />
                        </AntattInaktiveringsgrunnProvider>
                    </DagpengerStatusProvider>
                </MeldepliktProvider>
            </AmplitudeProvider>
        </ProfilProvider>
    );
};

export default ReaktiveringWrapper;
