import { useFeatureToggleData } from '../contexts/feature-toggles';
import { useReaktivering } from '../contexts/reaktivering';

import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import IkkeStandard from '../komponenter/ikke-standard/ikke-standard';
import Motestotte from '../komponenter/ikke-standard/motestotte';
import { AutomatiskReaktivert } from '../komponenter/reaktivering/automatisk-reaktivert';
import { visAutomatiskReaktiveringsKort } from '../lib/vis-automatisk-reaktiverings-kort';

import styles from './innhold.module.css';

const InnholdView = () => {
    const featureToggleData = useFeatureToggleData();
    const { reaktivering } = useReaktivering();

    const skalViseReaktiveringsKort = visAutomatiskReaktiveringsKort(featureToggleData, reaktivering);

    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="AiA i viewport" />
            <div className={styles.limit}>
                {skalViseReaktiveringsKort ? (
                    <AutomatiskReaktivert />
                ) : (
                    <>
                        <ReaktiveringKvittering />
                        <RegistrertTittel />
                        <IkkeStandard />
                        <Motestotte />
                    </>
                )}
            </div>
            <InViewport loggTekst="AiA i viewport - bunnen" />
        </>
    );
};

export default InnholdView;
