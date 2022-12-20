import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import Situasjonsbestemt from '../komponenter/situasjonsbestemt/situasjonsbestemt';
import KvitteringEgenvurdering from '../komponenter/kvitteringer/kvittering-egenvurdering';
import { AutomatiskReaktivert } from '../komponenter/reaktivering/automatisk-reaktivert';

import styles from './innhold.module.css';

const InnholdSituasjonsbestemt = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="AiA i viewport" />
            <div className={styles.limit}>
                <AutomatiskReaktivert />
                <ReaktiveringKvittering />
                <KvitteringEgenvurdering />
                <RegistrertTittel />
                <Situasjonsbestemt />
            </div>
            <InViewport loggTekst="AiA i viewport - bunnen" />
        </>
    );
};

export default InnholdSituasjonsbestemt;
