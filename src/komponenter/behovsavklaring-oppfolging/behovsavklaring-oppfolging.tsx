import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useOppfolgingData, Servicegruppe } from '../../contexts/oppfolging';

import IkkeSvartPaaBehovsavklaring from './behovsavklaring-ikke-svart';
import SvartPaaBehovsavklaring from './behovsavklaring-svart';

function Behovsavklaring() {
    const { behovForVeiledning } = useBehovForVeiledning();
    const { servicegruppe } = useOppfolgingData();

    if (servicegruppe !== Servicegruppe.IVURD) {
        return <SvartPaaBehovsavklaring />;
    }

    return !behovForVeiledning ? <IkkeSvartPaaBehovsavklaring /> : <SvartPaaBehovsavklaring />;
}

export default Behovsavklaring;
