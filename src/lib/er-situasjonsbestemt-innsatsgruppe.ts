import { Brukerregistrering } from '../ducks/brukerregistrering';
import { Data as OppfolgingData } from '../ducks/oppfolging';

interface DataGrunnlag {
    brukerregistreringData: Brukerregistrering | null;
    oppfolgingData: OppfolgingData;
}

function erSituasjonsbestemtInnsatsgruppe(data: DataGrunnlag): boolean {
    const { brukerregistreringData, oppfolgingData } = data;
    const foreslattInnsatsgruppe = brukerregistreringData?.profilering?.innsatsgruppe;
    const { servicegruppe, formidlingsgruppe } = oppfolgingData;

    if (
        (servicegruppe === 'BFORM' || servicegruppe === 'IVURD') &&
        formidlingsgruppe === 'ARBS' &&
        foreslattInnsatsgruppe === 'SITUASJONSBESTEMT_INNSATS'
    ) {
        return true;
    }

    return false;
}

export default erSituasjonsbestemtInnsatsgruppe;
