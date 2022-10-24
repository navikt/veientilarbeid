import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import IkkeSvartPaaBehovsavklaring from './behovsavklaring-ikke-svart';
import SvartPaaBehovsavklaring from './behovsavklaring-svart';

function Behovsavklaring() {
    const { behovForVeiledning } = useBehovForVeiledning();

    return behovForVeiledning ? <SvartPaaBehovsavklaring /> : <IkkeSvartPaaBehovsavklaring />;
}

export default Behovsavklaring;
