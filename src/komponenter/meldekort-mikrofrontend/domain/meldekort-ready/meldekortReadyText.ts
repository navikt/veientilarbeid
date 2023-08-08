import { MeldekortData } from '../../types/MeldekortType';
import lagHentTekstForSprak, { Tekster } from '../../../../lib/lag-hent-tekst-for-sprak';
import { Sprak } from '../../../../contexts/sprak';
import { formaterDatoString } from '../../../../utils/date-utils';

const TEKSTER: Tekster<string> = {
    nb: {
        'meldekort.ett': 'Send inn meldekort',
        'meldekort.flere': 'Du har {count} meldekort klare til innsending ',
        'meldekort.dato': 'Uke {next} ({from} - {until})',
        'meldekort.info.om.trekk': 'Siste frist før trekk: {dato}',
    },
    nn: {
        'meldekort.ett': 'Send inn meldekort',
        'meldekort.flere': 'Du har {count} meldekort klare til innsending ',
        'meldekort.dato': 'Veke {next} ({from} - {until})',
        'meldekort.info.om.trekk': 'Siste frist før trekk: {dato}',
    },
    en: {
        'meldekort.ett': 'Submit employment status form',
        'meldekort.flere': 'You have {count} employment status forms ready to be sent ',
        'meldekort.dato': 'Week {next} ({from} - {until})',
        'meldekort.info.om.trekk': 'The final submission deadline without reduced payout: {dato}',
    },
};

export const createReadyForInnsendingText = (meldekort: MeldekortData, sprak: Sprak) => {
    if (!meldekort.nyeMeldekort?.nesteMeldekort) {
        return '';
    }

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const id = meldekort.nyeMeldekort.antallNyeMeldekort === 1 ? 'meldekort.ett' : 'meldekort.flere';
    return `${tekst(id)}`.replace('{count}', `${meldekort.nyeMeldekort.antallNyeMeldekort}`);
};

export const createDatoLabel = (meldekort: MeldekortData, sprak: Sprak) => {
    if (!meldekort.nyeMeldekort?.nesteMeldekort) {
        return '';
    }

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const fra = formaterDatoString(meldekort.nyeMeldekort.nesteMeldekort.fra, sprak);
    const til = formaterDatoString(meldekort.nyeMeldekort.nesteMeldekort.til, sprak);
    const uke = meldekort.nyeMeldekort.nesteMeldekort.uke;

    return `${tekst('meldekort.dato')}`.replace('{next}', uke).replace('{from}', fra).replace('{until}', til);
};

export const createRisikererTrekkDescription = (meldekort: MeldekortData, sprak: Sprak) => {
    if (!meldekort?.nyeMeldekort?.nesteMeldekort) {
        return '';
    }

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const dato = formaterDatoString(meldekort?.nyeMeldekort.nesteMeldekort.sisteDatoForTrekk, sprak);

    return `${tekst('meldekort.info.om.trekk')}`.replace('{dato}', dato);
};
