import dagerFraDato from '../utils/dager-fra-dato';

type TekstNokkel = 'trinn1' | 'trinn1Fortid' | 'trinn1Idag' | 'trinn1Fremtid';

function hentTekstnokkelForOnboardingTrinn1(arbeidsledigDato?: Date): TekstNokkel {
    if (!arbeidsledigDato) {
        return 'trinn1';
    }

    const delta = dagerFraDato(new Date(), arbeidsledigDato);

    if (delta < 0) {
        return 'trinn1Fortid';
    } else if (delta === 0) {
        return 'trinn1Idag';
    } else {
        return 'trinn1Fremtid';
    }
}

export default hentTekstnokkelForOnboardingTrinn1;
