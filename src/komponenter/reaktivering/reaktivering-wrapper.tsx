import { useFeatureToggleData } from '../../contexts/feature-toggles';
import ReaktiveringKort from './reaktivering-kort';
import Reaktivering from './reaktivering';

const ReaktiveringWrapper = () => {
    const featuretoggledata = useFeatureToggleData();
    const brukProfil = featuretoggledata['veientilarbeid.bruk-profil'];

    if (brukProfil) {
        return <Reaktivering />;
    }
    return <ReaktiveringKort />;
};

export default ReaktiveringWrapper;
