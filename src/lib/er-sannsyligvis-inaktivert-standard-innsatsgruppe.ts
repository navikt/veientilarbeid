import { Brukerregistrering } from '../hooks/use-brukerregistrering-data';
import { Data as OppfolgingData } from '../hooks/use-oppfolging-data';

interface DataGrunnlag {
    brukerregistreringData: Brukerregistrering | null;
    oppfolgingData: OppfolgingData;
}

function erSannsynligvisInaktivertStandardbruker(data: DataGrunnlag): boolean {
    const { oppfolgingData } = data;
    const { servicegruppe, formidlingsgruppe, kanReaktiveres } = oppfolgingData;

    return servicegruppe === 'IKVAL' && formidlingsgruppe === 'ISERV' && kanReaktiveres === true;
}

function erSannsynligvisInaktivertSituasjonsbestemtBruker(data: DataGrunnlag): boolean {
    const { oppfolgingData } = data;
    const { servicegruppe, formidlingsgruppe, kanReaktiveres } = oppfolgingData;

    return servicegruppe === 'BFORM' && formidlingsgruppe === 'ISERV' && kanReaktiveres === true;
}

export { erSannsynligvisInaktivertStandardbruker, erSannsynligvisInaktivertSituasjonsbestemtBruker };
