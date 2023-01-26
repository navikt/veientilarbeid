import { Brukerregistrering } from '../contexts/brukerregistrering';
import { Data as OppfolgingData } from '../contexts/oppfolging';
import { Data as BrukerInfoData } from '../contexts/bruker-info';
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

    const brukerErStandardInnsatsgruppe = erStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const brukerErUngMedStandardInnsatsgruppe = brukerErStandardInnsatsgruppe && forsterketUngdomsinnsats;

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
