import { Brukerregistrering } from '../contexts/brukerregistrering';
import { Data as OppfolgingData } from '../contexts/oppfolging';

interface DataGrunnlag {
    brukerregistreringData: Brukerregistrering | null;
    oppfolgingData: OppfolgingData;
}

function sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe(data: DataGrunnlag): boolean {
    const { brukerregistreringData, oppfolgingData } = data;
    const foreslattInnsatsgruppe = brukerregistreringData?.profilering?.innsatsgruppe;
    const { servicegruppe, formidlingsgruppe } = oppfolgingData;

    if (servicegruppe === 'BFORM' && formidlingsgruppe === 'ARBS') return true;
    return (
        servicegruppe === 'IVURD' &&
        formidlingsgruppe === 'ARBS' &&
        foreslattInnsatsgruppe === 'SITUASJONSBESTEMT_INNSATS'
    );
}

export default sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe;
