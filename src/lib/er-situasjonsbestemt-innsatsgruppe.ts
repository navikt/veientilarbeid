import { Data as OppfolgingData } from '../hooks/use-oppfolging-data';
import { Brukerregistrering } from '../hooks/use-brukerregistrering-data';

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
