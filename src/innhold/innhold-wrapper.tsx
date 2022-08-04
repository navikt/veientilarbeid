import { useFeatureToggleData } from '../contexts/feature-toggles';
import InnholdView from './innhold-view';
import InnholdVelger from './innhold-velger';

function InnholdWrapper() {
    const featureToggles = useFeatureToggleData();
    const skalBrukeSplitt = featureToggles['veientilarbeid.splitt-standard-visning'];

    if (skalBrukeSplitt) {
        return <InnholdVelger />;
    }

    return <InnholdView />;
}

export default InnholdWrapper;
