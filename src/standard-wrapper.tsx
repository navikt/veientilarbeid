import { useFeatureToggleData } from './contexts/feature-toggles';
import { useReaktivering } from './contexts/reaktivering';

import AiaTabs from './tabs/aia-tabs';
import InnholdStandard from './innhold/innhold-standard';
import { useWindowInnerWidth } from './contexts/window-inner-width';
import { MIN_TABS_BREDDE } from './hooks/use-skal-bruke-tabs';
import { visAutomatiskReaktiveringsKort } from './lib/vis-automatisk-reaktiverings-kort';
import { AutomatiskReaktivert } from './komponenter/reaktivering/automatisk-reaktivert';

import flex from './flex.module.css';
import styles from './innhold/innhold.module.css';

function StandardWrapper() {
    const { innerWidth } = useWindowInnerWidth();
    const featuretoggleData = useFeatureToggleData();
    const { reaktivering } = useReaktivering();

    const brukTabs = innerWidth > MIN_TABS_BREDDE;

    const skalViseReaktiveringsKort = visAutomatiskReaktiveringsKort(featuretoggleData, reaktivering);

    if (skalViseReaktiveringsKort) {
        return (
            <div className={styles.limitStandard}>
                <div className={`${styles.limitCenter} ${styles.card}`}>
                    <AutomatiskReaktivert />
                </div>
            </div>
        );
    }

    return <div className={`${flex.flex} ${flex.center}`}>{brukTabs ? <AiaTabs /> : <InnholdStandard />}</div>;
}

export default StandardWrapper;
