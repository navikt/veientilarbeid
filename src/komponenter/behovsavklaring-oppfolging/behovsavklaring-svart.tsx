import { useBrukerregistreringData, ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';

import SvartPaaBehovsavklaringStandardInnsats from './behovsavklaring-svart-standard';
import SvartPaaBehovsavklaringSituasjonsbestemt from './behovsavklaring-svart-situasjonsbestemt';

function SvartPaaBehovsavklaring() {
    const brukerregistreringsData = useBrukerregistreringData();
    const foreslattInnsatsgruppe = brukerregistreringsData?.registrering?.profilering?.innsatsgruppe;

    if (!foreslattInnsatsgruppe) return null;

    return foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ? (
        <SvartPaaBehovsavklaringStandardInnsats />
    ) : (
        <SvartPaaBehovsavklaringSituasjonsbestemt />
    );
}

export default SvartPaaBehovsavklaring;
