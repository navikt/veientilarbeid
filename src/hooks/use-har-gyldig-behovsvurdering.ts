import { useBehovForVeiledning } from '../contexts/behov-for-veiledning';
import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import { Servicegruppe, useOppfolgingData } from './use-oppfolging-data';
import { useProfilering } from '../contexts/profilering';

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

export function useHarGyldigBehovsvurderingNyttApi() {
    const behov = useBehovForVeiledning();
    const { behovForVeiledning } = behov;
    const { profilering: profileringer } = useProfilering();
    const profileringId = profileringer[0]?.profileringId;
    return profileringId && profileringId === behovForVeiledning?.profileringId;
}

export default useHarGyldigBehovsvurdering;
