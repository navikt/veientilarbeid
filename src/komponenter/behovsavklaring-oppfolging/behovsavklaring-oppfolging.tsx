import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import IkkeSvartPaaBehovsavklaring from './behovsavklaring-ikke-svart';
import SvartKlareSegSelvPaaBehovsavklaring from './behovsavklaring-svart-klare-seg-selv';
import SvartOnskerOppfolgingPaaBehovsavklaring from './behovsavklaring-svart-onsker-oppfolging';

function Behovsavklaring() {
    const { behovForVeiledning } = useBehovForVeiledning();

    return !behovForVeiledning ? (
        <IkkeSvartPaaBehovsavklaring />
    ) : behovForVeiledning?.oppfolging === 'KLARE_SEG_SELV' ? (
        <SvartKlareSegSelvPaaBehovsavklaring />
    ) : (
        <SvartOnskerOppfolgingPaaBehovsavklaring />
    );
}

export default Behovsavklaring;
