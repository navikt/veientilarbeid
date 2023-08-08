import { MeldekortData } from '../../types/MeldekortType';
import { Sprak } from '../../../../contexts/sprak';
import lagHentTekstForSprak, { Tekster } from '../../../../lib/lag-hent-tekst-for-sprak';
import { formaterDatoString } from '../../../../utils/date-utils';

const TEKSTER: Tekster<string> = {
    nb: {
        'meldekort.melding.fremtidig': 'Neste meldekort kan sendes fra {dato} ',
    },
    nn: {
        'meldekort.melding.fremtidig': 'Neste meldekort kan sendast frå {dato} ',
    },
    en: {
        'meldekort.melding.fremtidig': 'The next employment status form can be sent on {dato} ',
    },
};

export const createPendingForInnsendingText = (meldekort: MeldekortData, sprak: Sprak) => {
    if (!meldekort.nyeMeldekort?.nesteInnsendingAvMeldekort) {
        return '';
    }

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const dato = formaterDatoString(meldekort.nyeMeldekort.nesteInnsendingAvMeldekort, sprak);

    return `${tekst('meldekort.melding.fremtidig')}`.replace('{dato}', dato);
};
