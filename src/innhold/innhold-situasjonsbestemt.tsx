import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import Situasjonsbestemt from '../komponenter/situasjonsbestemt/situasjonsbestemt';
import KvitteringEgenvurdering from '../komponenter/kvitteringer/kvittering-egenvurdering';

import styles from './innhold.module.css';

const InnholdSituasjonsbestemt = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="AiA i viewport" />
            <div className={styles.limit}>
                <ReaktiveringKvittering />
                <KvitteringEgenvurdering />
                <RegistrertTittel />
                <Situasjonsbestemt />
            </div>
            <InViewport loggTekst="Bunnen av AiA i viewport" />
        </>
    );
};

export default InnholdSituasjonsbestemt;
