import { useFeatureToggleData } from '../contexts/feature-toggles';

import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import GjelderFraDato from '../komponenter/gjelder-fra-dato/GjelderFraDato';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';
import HjelpOgStotte from '../komponenter/hjelp-og-stotte/hjelp-og-stotte';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import KvitteringEgenvurdering from '../komponenter/kvitteringer/kvittering-egenvurdering';
import Behovsavklaring from '../komponenter/behovsavklaring-oppfolging/behovsavklaring-oppfolging';

import styles from './innhold.module.css';

const InnholdStandard = () => {
    const features = useFeatureToggleData();
    const visBehovsAvklaring = features['veientilarbeid.bruk-klarer-seg-selv'];

    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport" />
            <div className={styles.limit}>
                <ReaktiveringKvittering />
                <KvitteringEgenvurdering />
                <RegistrertTittel />
                <DagpengerOgYtelser />
                <Meldekort />
                {visBehovsAvklaring ? <Behovsavklaring /> : <HjelpOgStotte />}
                <Aktivitetsplan />
                <GjelderFraDato />
            </div>
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport" />
        </>
    );
};

export default InnholdStandard;
