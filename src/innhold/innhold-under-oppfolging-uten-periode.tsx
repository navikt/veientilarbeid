import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';

import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import ReaktiveringWrapper from '../komponenter/reaktivering/reaktivering-wrapper';
import InnholdMetrics from './innhold-metrics';
import ForenkletInnhold from '../komponenter/ikke-standard/forenklet-innhold';
import Motestotte from '../komponenter/ikke-standard/motestotte';

import styles from './innhold.module.css';
import { Formidlingsgruppe, Servicegruppe, useOppfolgingData } from '../hooks/use-oppfolging-data';
import { useBrukerInfoData } from '../hooks/use-brukerinfo-data';

const InnholdUnderOppfolgingUtenPeriode = () => {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const { servicegruppe, formidlingsgruppe } = useOppfolgingData();
    const { rettighetsgruppe } = useBrukerInfoData();

    const erIkkeAAP = rettighetsgruppe !== 'AAP';
    const erIkkeVarig = servicegruppe !== Servicegruppe.VARIG;
    const erIkkeArenaArbs = formidlingsgruppe !== Formidlingsgruppe.ARBS;
    const skalViseReaktivering =
        (arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode as number) < 28 &&
        erIkkeAAP &&
        erIkkeVarig &&
        erIkkeArenaArbs;

    return (
        <>
            <InnholdMetrics />
            <div className={styles.limitCenter}>
                {skalViseReaktivering && <ReaktiveringWrapper />}
                <div className={styles.card}>
                    <ForenkletInnhold />
                    <Motestotte />
                </div>
            </div>
        </>
    );
};

export default InnholdUnderOppfolgingUtenPeriode;
