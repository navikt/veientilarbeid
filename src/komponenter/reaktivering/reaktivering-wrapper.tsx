import Reaktivering from './reaktivering';
import { ProfilProvider } from '../../contexts/profil';
import { MeldepliktProvider } from '../../contexts/meldeplikt';
import { DagpengerStatusProvider } from '../../contexts/dagpenger-status';

const ReaktiveringWrapper = () => {
    return (
        <ProfilProvider>
            <MeldepliktProvider>
                <DagpengerStatusProvider>
                    <Reaktivering />
                </DagpengerStatusProvider>
            </MeldepliktProvider>
        </ProfilProvider>
    );
};

export default ReaktiveringWrapper;
