import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useOppfolgingData, Servicegruppe } from '../../contexts/oppfolging';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';

import IkkeSvartPaaBehovsavklaring from './behovsavklaring-ikke-svart';
import SvartPaaBehovsavklaring from './behovsavklaring-svart';
import BehovsavklaringAvklart from './behovsavklaring-avklart';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';

function Behovsavklaring() {
    const { behovForVeiledning } = useBehovForVeiledning();
    const { servicegruppe } = useOppfolgingData();
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const { harAktivArbeidssokerperiode, aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const harSistSvartDato = behovForVeiledning && behovForVeiledning.dato ? new Date(behovForVeiledning.dato) : null;
    const harPeriodeStart = harAktivArbeidssokerperiode === 'Ja' ? new Date(aktivPeriodeStart) : null;

    if (servicegruppe !== Servicegruppe.IVURD) {
        return <BehovsavklaringAvklart servicegruppe={servicegruppe} />;
    }

    const harGyldigBehovsvurdering = harSistSvartDato && harPeriodeStart && harSistSvartDato > harPeriodeStart;

    return !harGyldigBehovsvurdering ? <IkkeSvartPaaBehovsavklaring /> : <SvartPaaBehovsavklaring />;
}

export default Behovsavklaring;
