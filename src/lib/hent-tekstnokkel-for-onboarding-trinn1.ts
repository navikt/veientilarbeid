import dagerFraDato from '../utils/dager-fra-dato';

type TekstNokkel = 'trinn1' | 'trinn1Fortid' | 'trinn1Idag' | 'trinn1Imorgen' | 'trinn1Fremtid';

function hentTekstnokkelForOnboardingTrinn1(arbeidsledigDato?: string | null): TekstNokkel {
    if (!arbeidsledigDato) {
        return 'trinn1';
    }

    const dato = new Date(arbeidsledigDato);
    const delta = dagerFraDato(new Date(), dato);

    if (delta < -1) {
        return 'trinn1Fortid';
    } else if (delta === 0) {
        return 'trinn1Idag';
    } else if (delta === -1) {
        return 'trinn1Imorgen';
    } else {
        return 'trinn1Fremtid';
    }
}

export default hentTekstnokkelForOnboardingTrinn1;
