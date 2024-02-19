import BehovsavklaringAvklartSituasjonsbestemt from './behovsavklaring-avklart-situasjonsbestemt';
import BehovsavklaringAvklartStandard from './behovsavklaring-avklart-standard';
import { Servicegruppe, ServicegruppeOrNull } from '../../hooks/use-oppfolging-data';

function BehovsavklaringAvklart({ servicegruppe }: { servicegruppe: ServicegruppeOrNull }) {
    const erStandard = servicegruppe === Servicegruppe.IKVAL;

    return erStandard ? <BehovsavklaringAvklartStandard /> : <BehovsavklaringAvklartSituasjonsbestemt />;
}

export default BehovsavklaringAvklart;
