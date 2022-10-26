import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import IkkeStandard from '../komponenter/ikke-standard/ikke-standard';
import Motestotte from '../komponenter/ikke-standard/motestotte';

import styles from './innhold.module.css';

const InnholdView = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport - ikke-standard" />
            <div className={styles.limit}>
                <ReaktiveringKvittering />
                <RegistrertTittel />
                <IkkeStandard />
                <Motestotte />
            </div>
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport - ikke-standard" />
        </>
    );
};

export default InnholdView;
