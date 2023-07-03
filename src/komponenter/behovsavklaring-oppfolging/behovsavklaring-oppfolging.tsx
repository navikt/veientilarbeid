import { Servicegruppe, useOppfolgingData } from '../../contexts/oppfolging';

import IkkeSvartPaaBehovsavklaring from './behovsavklaring-ikke-svart';
import SvartPaaBehovsavklaring from './behovsavklaring-svart';
import BehovsavklaringAvklart from './behovsavklaring-avklart';
import useHarGyldigBehovsvurdering from '../../hooks/use-har-gyldig-behovsvurdering';

function Behovsavklaring() {
    const { servicegruppe } = useOppfolgingData();
    const harGyldigBehovsvurdering = useHarGyldigBehovsvurdering();

    if (servicegruppe !== Servicegruppe.IVURD) {
        return <BehovsavklaringAvklart servicegruppe={servicegruppe} />;
    }

    return !harGyldigBehovsvurdering ? <IkkeSvartPaaBehovsavklaring /> : <SvartPaaBehovsavklaring />;
}

export default Behovsavklaring;
