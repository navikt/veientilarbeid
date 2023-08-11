import { MeldekortData } from '../../types/MeldekortType';
import lagHentTekstForSprak, { Tekster } from '../../../../lib/lag-hent-tekst-for-sprak';
import { Sprak } from '../../../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        'meldekort.etterregistreringer': 'Du har fått vedtak for en periode du ikke har sendt meldekort.',
    },
    nn: {
        'meldekort.etterregistreringer': 'Du har fått vedtak for ein periode du ikkje har sendt meldekort.',
    },
    en: {
        'meldekort.etterregistreringer':
            'You have received a decision for a period in which you have not sent employment status form.',
    },
};
export const createMeldekortEtterregistreringText = (meldekort: MeldekortData | undefined, sprak: Sprak) => {
    if (!meldekort) {
        return '';
    }

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return `${tekst('meldekort.etterregistreringer')}`;
};
