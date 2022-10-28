import { BehovForVeiledningValg } from '../contexts/behov-for-veiledning';
import { ForeslattInnsatsgruppe } from '../contexts/brukerregistrering';

const muligeSvar = {
    STANDARD_INNSATS_KLARE_SEG_SELV: 'Jeg ønsker å klare meg selv',
    STANDARD_INNSATS_ONSKER_OPPFOLGING: 'Jeg ønsker hjelp fra en veileder',
    SITUASJONSBESTEMT_INNSATS_KLARE_SEG_SELV: 'Jeg ønsker ikke hjelp fra en veileder',
    SITUASJONSBESTEMT_INNSATS_ONSKER_OPPFOLGING: 'Jeg ønsker hjelp fra en veileder',
};

function genererDialogmelding(foreslattInnsatsgruppe: ForeslattInnsatsgruppe, veiledningsValg: BehovForVeiledningValg) {
    let melding: string[] = [];

    melding.push(`Mitt svar: ${muligeSvar[foreslattInnsatsgruppe + '_' + veiledningsValg]}`);

    melding.push(
        `Foreslått behov: ${
            foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ? 'Gode muligheter' : 'Situasjonsbestemt'
        }`
    );

    melding.push('Dette er en automatisk generert melding');

    return melding.join('/n/n');
}

export { genererDialogmelding };
