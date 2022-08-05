import { useFeatureToggleData } from '../contexts/feature-toggles';
import InnholdView from './innhold-view';
import InnholdVelger from './innhold-velger';
import Rad from './rad';
import GenerelleFliser from '../komponenter/dittnav/generelle-fliser';

function InnholdWrapper() {
    const featureToggles = useFeatureToggleData();
    const skalBrukeSplitt = featureToggles['veientilarbeid.splitt-standard-visning'];

    if (skalBrukeSplitt) {
        return (
            <>
                <InnholdVelger />
                <Rad>
                    <GenerelleFliser />
                </Rad>
            </>
        );
    }

    return (
        <>
            <InnholdView />
            <Rad>
                <GenerelleFliser />
            </Rad>
        </>
    );
}

export default InnholdWrapper;
