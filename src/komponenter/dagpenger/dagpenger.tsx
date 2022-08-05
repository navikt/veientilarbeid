import Sluttkort from './sluttkort';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

function Dagpenger() {
    const featureToggles = useFeatureToggleData();

    if (!featureToggles['veientilarbeid.ny-dagpengekomponent']) return null;

    return <Sluttkort />;
}

export default Dagpenger;
