import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import IkkeStandard from '../komponenter/ikke-standard/ikke-standard';
import Motestotte from '../komponenter/ikke-standard/motestotte';
import { AutomatiskReaktivert } from '../komponenter/reaktivering/automatisk-reaktivert';

import styles from './innhold.module.css';

const InnholdView = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="AiA i viewport" />
            <div className={styles.limit}>
                <AutomatiskReaktivert />
                <ReaktiveringKvittering />
                <RegistrertTittel />
                <IkkeStandard />
                <Motestotte />
            </div>
            <InViewport loggTekst="AiA i viewport - bunnen" />
        </>
    );
};

export default InnholdView;
