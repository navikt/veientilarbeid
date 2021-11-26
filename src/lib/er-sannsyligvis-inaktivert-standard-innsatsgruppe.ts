import { Brukerregistrering } from '../contexts/brukerregistrering';
import { Data as OppfolgingData } from '../contexts/oppfolging';

interface DataGrunnlag {
    brukerregistreringData: Brukerregistrering | null;
    oppfolgingData: OppfolgingData;
}

function erSannsynligvisInaktivertStandardbruker(data: DataGrunnlag): boolean {
    const { oppfolgingData } = data;
    const { servicegruppe, formidlingsgruppe, kanReaktiveres } = oppfolgingData;

    if (servicegruppe === 'IKVAL' && formidlingsgruppe === 'ARBS' && kanReaktiveres === true) {
        return true;
    }

    return false;
}

export default erSannsynligvisInaktivertStandardbruker;
