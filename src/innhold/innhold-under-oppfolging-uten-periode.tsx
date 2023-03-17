import { useOppfolgingData } from '../contexts/oppfolging';
import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import { useBrukerinfoData } from '../contexts/bruker-info';

import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import ReaktiveringWrapper from '../komponenter/reaktivering/reaktivering-wrapper';
import { Servicegruppe } from '../contexts/oppfolging';
import InnholdMetrics from './innhold-metrics';
import ForenkletInnhold from '../komponenter/ikke-standard/forenklet-innhold';
import Motestotte from '../komponenter/ikke-standard/motestotte';

import styles from './innhold.module.css';

const InnholdUnderOppfolgingUtenPeriode = () => {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const { servicegruppe } = useOppfolgingData();
    const { rettighetsgruppe } = useBrukerinfoData();

    const erIkkeAAP = rettighetsgruppe !== 'AAP';
    const erIkkeVarig = servicegruppe !== Servicegruppe.VARIG;
    const skalViseReaktivering =
        arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode < 28 && erIkkeAAP && erIkkeVarig;

    return (
        <>
            <InnholdMetrics />
            <div className={styles.limit}>
                {skalViseReaktivering && <ReaktiveringWrapper />}
                <ForenkletInnhold />
                <Motestotte />
            </div>
        </>
    );
};

export default InnholdUnderOppfolgingUtenPeriode;
