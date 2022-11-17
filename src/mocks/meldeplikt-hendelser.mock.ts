import { MeldeKortType } from '../contexts/meldeplikt';

const levertMeldekortMock = (erArbeidssokerNestePeriode: boolean) => ({
    erArbeidssokerNestePeriode,
    periodeFra: '2022-10-24',
    periodeTil: '2022-11-06',
    meldekorttype: 'MANUELL_ARENA' as MeldeKortType,
    eventOpprettet: '2022-11-09T12:30:52.107',
});

export default levertMeldekortMock;
