import { useFeatureToggleData } from '../contexts/feature-toggles';
import { useOppfolgingData, Servicegruppe } from '../contexts/oppfolging';

import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import IkkeStandard from '../komponenter/ikke-standard/ikke-standard';
import Egenvurdering from '../komponenter/ikke-standard/egenvurdering';
import KvitteringEgenvurdering from '../komponenter/kvitteringer/kvittering-egenvurdering';

import styles from './innhold.module.css';

const InnholdSituasjonsbestemt = () => {
    const features = useFeatureToggleData();
    const { servicegruppe } = useOppfolgingData();
    const harIkke14aVedtak = servicegruppe === Servicegruppe.IVURD;
    const brukBehovsAvklaring = features['veientilarbeid.bruk-klarer-seg-selv'];
    const visBehovsAvklaring = brukBehovsAvklaring && harIkke14aVedtak;

    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport - situasjonsbestemt" />
            <div className={styles.limit}>
                <ReaktiveringKvittering />
                <KvitteringEgenvurdering />
                <RegistrertTittel />
                <IkkeStandard />
                {!visBehovsAvklaring && <Egenvurdering />}
            </div>
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport - situasjonsbestemt" />
        </>
    );
};

export default InnholdSituasjonsbestemt;
