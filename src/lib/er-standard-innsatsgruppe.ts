import { Brukerregistrering } from '../ducks/brukerregistrering';
import { Data as OppfolgingData } from '../ducks/oppfolging';

interface DataGrunnlag {
    brukerregistreringData: Brukerregistrering | null;
    oppfolgingData: OppfolgingData;
}

function erStandardInnsatsgruppe(data: DataGrunnlag): boolean {
    const { brukerregistreringData, oppfolgingData } = data;
    const foreslattInnsatsgruppe = brukerregistreringData?.profilering?.innsatsgruppe;
    const { servicegruppe, formidlingsgruppe } = oppfolgingData;

    if (servicegruppe === 'IVURD' && formidlingsgruppe === 'ARBS' && foreslattInnsatsgruppe === 'STANDARD_INNSATS') {
        return true;
    }
    if (servicegruppe === 'IKVAL' && formidlingsgruppe === 'ARBS') {
        return true;
    }

    return false;
}

export default erStandardInnsatsgruppe;
