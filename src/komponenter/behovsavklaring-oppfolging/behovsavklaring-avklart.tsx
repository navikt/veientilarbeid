import { useOppfolgingData, Servicegruppe } from '../../contexts/oppfolging';

import BehovsavklaringAvklartSituasjonsbestemt from './behovsavklaring-avklart-situasjonsbestemt';
import BehovsavklaringAvklartStandard from './behovsavklaring-avklart-standard';

function BehovsavklaringAvklart() {
    const { servicegruppe } = useOppfolgingData();
    const erStandard = servicegruppe === Servicegruppe.IKVAL;

    return erStandard ? <BehovsavklaringAvklartStandard /> : <BehovsavklaringAvklartSituasjonsbestemt />;
}

export default BehovsavklaringAvklart;
