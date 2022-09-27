import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import styles from './innhold.module.css';
import IkkeStandard from '../komponenter/ikke-standard/ikke-standard';
import Motestotte from '../komponenter/ikke-standard/motestotte';
import Egenvurdering from '../komponenter/ikke-standard/egenvurdering';

const InnholdUnderOppfolgingUtenPeriode = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport - under oppfølging - uten arbeidssøkerperiode" />
            <div className={styles.limit}>
                <IkkeStandard />
                <Motestotte />
                <Egenvurdering />
            </div>
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport -  under oppfølging - uten arbeidssøkerperiode" />
        </>
    );
};

export default InnholdUnderOppfolgingUtenPeriode;
