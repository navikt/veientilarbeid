import SvartPaaBehovsavklaringStandardInnsats from './behovsavklaring-svart-standard';
import SvartPaaBehovsavklaringSituasjonsbestemt from './behovsavklaring-svart-situasjonsbestemt';
import { Servicegruppe, ServicegruppeOrNull, useOppfolgingData } from '../../hooks/use-oppfolging-data';
import { ForeslattInnsatsgruppe, useBrukerregistreringData } from '../../hooks/use-brukerregistrering-data';

function hentInnsatsgruppe(
    servicegruppe: ServicegruppeOrNull,
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe | undefined,
) {
    if (servicegruppe === Servicegruppe.IVURD) {
        return foreslattInnsatsgruppe || null;
    }
    return servicegruppe === Servicegruppe.IKVAL
        ? ForeslattInnsatsgruppe.STANDARD_INNSATS
        : ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS;
}

function SvartPaaBehovsavklaring() {
    const brukerregistreringsData = useBrukerregistreringData();
    const { servicegruppe } = useOppfolgingData();
    const foreslattInnsatsgruppe = brukerregistreringsData?.registrering?.profilering?.innsatsgruppe;
    const innsatsgruppe = hentInnsatsgruppe(servicegruppe, foreslattInnsatsgruppe);

    if (!innsatsgruppe) return null;

    return innsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ? (
        <SvartPaaBehovsavklaringStandardInnsats />
    ) : (
        <SvartPaaBehovsavklaringSituasjonsbestemt />
    );
}

export default SvartPaaBehovsavklaring;
