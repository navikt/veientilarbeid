import { Data as OppfolgingData } from '../hooks/use-oppfolging-data';
import { Brukerregistrering } from '../hooks/use-brukerregistrering-data';

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
