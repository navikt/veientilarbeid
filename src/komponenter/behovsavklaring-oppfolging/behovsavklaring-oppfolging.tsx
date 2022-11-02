import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useOppfolgingData, Servicegruppe } from '../../contexts/oppfolging';

import IkkeSvartPaaBehovsavklaring from './behovsavklaring-ikke-svart';
import SvartPaaBehovsavklaring from './behovsavklaring-svart';
import BehovsavklaringAvklart from './behovsavklaring-avklart';

function Behovsavklaring() {
    const { behovForVeiledning } = useBehovForVeiledning();
    const { servicegruppe } = useOppfolgingData();

    if (servicegruppe !== Servicegruppe.IVURD) {
        return <BehovsavklaringAvklart servicegruppe={servicegruppe} />;
    }

    //TODO: sjekke at dato for svar er senere enn start på løpende arbeidssøkerperiode

    return !behovForVeiledning ? <IkkeSvartPaaBehovsavklaring /> : <SvartPaaBehovsavklaring />;
}

export default Behovsavklaring;
