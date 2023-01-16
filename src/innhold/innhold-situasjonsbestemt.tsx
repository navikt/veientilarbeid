import { useFeatureToggleData } from '../contexts/feature-toggles';
import { useReaktivering } from '../contexts/reaktivering';

import InnholdMetrics from './innhold-metrics';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import Situasjonsbestemt from '../komponenter/situasjonsbestemt/situasjonsbestemt';
import KvitteringEgenvurdering from '../komponenter/kvitteringer/kvittering-egenvurdering';
import { AutomatiskReaktivert } from '../komponenter/reaktivering/automatisk-reaktivert';
import { visAutomatiskReaktiveringsKort } from '../lib/vis-automatisk-reaktiverings-kort';

import styles from './innhold.module.css';

const InnholdSituasjonsbestemt = () => {
    const featureToggleData = useFeatureToggleData();
    const { reaktivering } = useReaktivering();

    const skalViseReaktiveringsKort = visAutomatiskReaktiveringsKort(featureToggleData, reaktivering);

    return (
        <>
            <InnholdMetrics />
            <div className={styles.limit}>
                {skalViseReaktiveringsKort ? (
                    <AutomatiskReaktivert />
                ) : (
                    <>
                        <ReaktiveringKvittering />
                        <KvitteringEgenvurdering />
                        <RegistrertTittel />
                        <Situasjonsbestemt />
                    </>
                )}
            </div>
        </>
    );
};

export default InnholdSituasjonsbestemt;
