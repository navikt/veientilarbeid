import { useBehovForVeiledning } from '../contexts/behov-for-veiledning';
import { Servicegruppe, useOppfolgingData } from '../contexts/oppfolging';
import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';

function useHarGyldigBehovsvurdering() {
    const behov = useBehovForVeiledning();
    const { behovForVeiledning } = behov;
    const { servicegruppe } = useOppfolgingData();
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const { harAktivArbeidssokerperiode, aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperioderData);

    const harSistSvartDato = behovForVeiledning && behovForVeiledning.dato ? new Date(behovForVeiledning.dato) : null;
    const harPeriodeStart = harAktivArbeidssokerperiode === 'Ja' ? new Date(aktivPeriodeStart) : null;

    const harGyldigBehovsvurdering = harSistSvartDato && harPeriodeStart && harSistSvartDato > harPeriodeStart;
    return servicegruppe === Servicegruppe.IVURD && harGyldigBehovsvurdering;
}

export default useHarGyldigBehovsvurdering;