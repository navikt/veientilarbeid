import SvartPaaBehovsavklaringStandardInnsats from './behovsavklaring-svart-standard';
import SvartPaaBehovsavklaringSituasjonsbestemt from './behovsavklaring-svart-situasjonsbestemt';
import { Servicegruppe, ServicegruppeOrNull, useOppfolgingData } from '../../hooks/use-oppfolging-data';
import { useProfilering } from '../../contexts/profilering';
import { Profilering, ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';

function hentProfilertTil(servicegruppe: ServicegruppeOrNull, profilering: Profilering | undefined) {
    if (servicegruppe === Servicegruppe.IVURD) {
        return profilering?.profilertTil || null;
    }
    return servicegruppe === Servicegruppe.IKVAL
        ? ProfilertTil.ANTATT_GODE_MULIGHETER
        : ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING;
}

function SvartPaaBehovsavklaring() {
    const { servicegruppe } = useOppfolgingData();
    const { profilering } = useProfilering();

    const profilertTil = hentProfilertTil(servicegruppe, profilering[0]);

    if (!profilertTil) return null;

    return profilertTil === ProfilertTil.ANTATT_GODE_MULIGHETER ? (
        <SvartPaaBehovsavklaringStandardInnsats />
    ) : (
        <SvartPaaBehovsavklaringSituasjonsbestemt />
    );
}

export default SvartPaaBehovsavklaring;
