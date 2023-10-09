import { Brukerregistrering } from '../hooks/use-brukerregistrering-data';
import { Data as OppfolgingData } from '../hooks/use-oppfolging-data';
import { Data as BrukerInfoData } from '../hooks/use-brukerinfo-data';
import erStandardInnsatsgruppe from './er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';
import {
    erSannsynligvisInaktivertSituasjonsbestemtBruker,
    erSannsynligvisInaktivertStandardbruker,
} from './er-sannsyligvis-inaktivert-standard-innsatsgruppe';
import { BrukergruppeType } from '../metrics/amplitude-utils';

interface BeregnBrukergruppeData {
    brukerregistreringData: Brukerregistrering | null;
    oppfolgingData: OppfolgingData;
    brukerInfoData: BrukerInfoData;
}

function beregnBrukergruppe({
    brukerregistreringData,
    oppfolgingData,
    brukerInfoData,
}: BeregnBrukergruppeData): BrukergruppeType {
    const { alder } = brukerInfoData;
    const forsterketUngdomsinnsats = alder < 30;
    const over59 = alder > 59;

    const brukerErStandardInnsatsgruppe = erStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const brukerErUngMedStandardInnsatsgruppe = brukerErStandardInnsatsgruppe && forsterketUngdomsinnsats;

    const brukerErOver59MedStandardInnsatsgruppe = brukerErStandardInnsatsgruppe && over59;

    const brukerHarUkjentAlderMenStandardInnsatsgruppe =
        brukerErStandardInnsatsgruppe && (alder === 0 || alder === null);

    const brukerErSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const sannsynligvisInaktivertStandardbruker = erSannsynligvisInaktivertStandardbruker({
        brukerregistreringData,
        oppfolgingData,
    });
    const sannsynligvisInaktivertSituasjonsbestemtBruker = erSannsynligvisInaktivertSituasjonsbestemtBruker({
        brukerregistreringData,
        oppfolgingData,
    });

    if (brukerHarUkjentAlderMenStandardInnsatsgruppe) {
        return 'standard og ukjent alder';
    } else if (brukerErUngMedStandardInnsatsgruppe) {
        return 'standard og ungdomsinnsats';
    } else if (brukerErOver59MedStandardInnsatsgruppe) {
        return 'standard og over 59 år';
    } else if (brukerErStandardInnsatsgruppe) {
        return 'standard';
    } else if (brukerErSituasjonsbestemtInnsatsgruppe) {
        return 'situasjonsbestemt';
    } else if (sannsynligvisInaktivertStandardbruker) {
        return 'sannsynligvis standard og inaktivert';
    } else if (sannsynligvisInaktivertSituasjonsbestemtBruker) {
        return 'sannsynligvis situasjonsbestemt og inaktivert';
    }

    return 'annet';
}

export default beregnBrukergruppe;
