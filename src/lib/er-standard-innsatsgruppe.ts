import { Brukerregistrering } from '../contexts/brukerregistrering';
import { Data as OppfolgingData } from '../contexts/oppfolging';

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

    return servicegruppe === 'IKVAL' && formidlingsgruppe === 'ARBS';
}

export default erStandardInnsatsgruppe;
