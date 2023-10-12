import IkkeSvartPaaBehovsavklaringStandardInnsats from './behovsavklaring-ikke-svart-standard';
import IkkeSvartPaaBehovsavklaringSituasjonsbestemt from './behovsavklaring-ikke-svart-situasjonsbestemt';
import { ForeslattInnsatsgruppe, useBrukerregistreringData } from '../../hooks/use-brukerregistrering-data';

function IkkeSvartPaaBehovsavklaring() {
    const brukerregistreringsData = useBrukerregistreringData();
    const foreslattInnsatsgruppe = brukerregistreringsData?.registrering?.profilering?.innsatsgruppe;

    if (!foreslattInnsatsgruppe) return null;

    return foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ? (
        <IkkeSvartPaaBehovsavklaringStandardInnsats />
    ) : (
        <IkkeSvartPaaBehovsavklaringSituasjonsbestemt />
    );
}

export default IkkeSvartPaaBehovsavklaring;
