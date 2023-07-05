import { ForeslattInnsatsgruppe } from '../contexts/brukerregistrering';

const muligeSvar: { [key: string]: string } = {
    STANDARD_INNSATS_STANDARD_INNSATS: 'Jeg ønsker å klare meg selv',
    STANDARD_INNSATS_SITUASJONSBESTEMT_INNSATS: 'Jeg ønsker hjelp fra en veileder',
    SITUASJONSBESTEMT_INNSATS_STANDARD_INNSATS: 'Jeg ønsker ikke hjelp fra en veileder',
    SITUASJONSBESTEMT_INNSATS_SITUASJONSBETEMT_INNSATS: 'Jeg ønsker hjelp fra en veileder',
};

function genererDialogmelding(foreslattInnsatsgruppe: ForeslattInnsatsgruppe, veiledningsValg: ForeslattInnsatsgruppe) {
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
