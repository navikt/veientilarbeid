import Reaktivering from './reaktivering';
import { ProfilProvider } from '../../contexts/profil';

const ReaktiveringWrapper = () => {
    return (
        <ProfilProvider>
            <Reaktivering />
        </ProfilProvider>
    );
};

export default ReaktiveringWrapper;
