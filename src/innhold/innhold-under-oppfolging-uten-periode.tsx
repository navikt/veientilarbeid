import { useOppfolgingData } from '../contexts/oppfolging';
import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';

import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import ReaktiveringWrapper from '../komponenter/reaktivering/reaktivering-wrapper';
import { Servicegruppe } from '../contexts/oppfolging';
import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import IkkeStandard from '../komponenter/ikke-standard/ikke-standard';
import Motestotte from '../komponenter/ikke-standard/motestotte';
import Egenvurdering from '../komponenter/ikke-standard/egenvurdering';

import styles from './innhold.module.css';

const InnholdUnderOppfolgingUtenPeriode = () => {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const { servicegruppe } = useOppfolgingData();

    const skalViseReaktivering =
        arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode < 28 && servicegruppe !== Servicegruppe.VARIG;

    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport - under oppfølging - uten arbeidssøkerperiode" />
            <div className={styles.limit}>
                {skalViseReaktivering && <ReaktiveringWrapper />}
                <IkkeStandard />
                <Motestotte />
                <Egenvurdering />
            </div>
            <InViewport loggTekst="Bunnen av veien til arbeid i viewport -  under oppfølging - uten arbeidssøkerperiode" />
        </>
    );
};

export default InnholdUnderOppfolgingUtenPeriode;
