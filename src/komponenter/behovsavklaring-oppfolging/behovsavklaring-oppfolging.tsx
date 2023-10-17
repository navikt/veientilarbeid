import IkkeSvartPaaBehovsavklaring from './behovsavklaring-ikke-svart';
import SvartPaaBehovsavklaring from './behovsavklaring-svart';
import BehovsavklaringAvklart from './behovsavklaring-avklart';
import useHarGyldigBehovsvurdering from '../../hooks/use-har-gyldig-behovsvurdering';
import { Servicegruppe, useOppfolgingData } from '../../hooks/use-oppfolging-data';

function Behovsavklaring() {
    const { servicegruppe } = useOppfolgingData();
    const harGyldigBehovsvurdering = useHarGyldigBehovsvurdering();

    if (servicegruppe !== Servicegruppe.IVURD) {
        return <BehovsavklaringAvklart servicegruppe={servicegruppe} />;
    }

    return !harGyldigBehovsvurdering ? <IkkeSvartPaaBehovsavklaring /> : <SvartPaaBehovsavklaring />;
}

export default Behovsavklaring;
