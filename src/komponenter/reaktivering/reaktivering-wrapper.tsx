import Reaktivering from './reaktivering';
import { ProfilProvider } from '../../contexts/profil';
import { MeldepliktProvider } from '../../contexts/meldeplikt';

const ReaktiveringWrapper = () => {
    return (
        <ProfilProvider>
            <MeldepliktProvider>
                <Reaktivering />
            </MeldepliktProvider>
        </ProfilProvider>
    );
};

export default ReaktiveringWrapper;
