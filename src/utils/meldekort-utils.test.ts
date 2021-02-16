import meldekortHistore from '../mocks/meldekort.json';
import { beregnDagerEtterFastsattMeldedag, hentMeldegruppeForNesteMeldekort } from './meldekort-utils';

describe('tester beregning av antall dager etter fastsatt meldingsdag', () => {
    test('den returnerer null uten meldekortHistorie', () => {
        const iDag = new Date(new Date().toISOString().substr(0, 10));
        const dager = beregnDagerEtterFastsattMeldedag(iDag, null);
        expect(dager).toBe(null);
    });

    test('den returnerer null for 2021-01-19', () => {
        const iDag = new Date('2021-01-19T12:00:00+01:00');
        const dager = beregnDagerEtterFastsattMeldedag(iDag, meldekortHistore);
        expect(dager).toBe(null);
    });

    test('den returnerer 1 dager etter periodeslutt for 2020-12-15', () => {
        const iDag = new Date('2020-12-15T12:00:00+01:00');
        const dager = beregnDagerEtterFastsattMeldedag(iDag, meldekortHistore);
        expect(dager).toBe(1);
    });

    test('den returnerer 1 dager etter periodeslutt for 2020-12-29', () => {
        const iDag = new Date('2020-12-29');
        const dager = beregnDagerEtterFastsattMeldedag(iDag, meldekortHistore);
        expect(dager).toBe(1);
    });

    test('den returnerer -1 dager etter periodeslutt for 2020-12-27', () => {
        const iDag = new Date('2020-12-27');
        const dager = beregnDagerEtterFastsattMeldedag(iDag, meldekortHistore);
        expect(dager).toBe(-1);
    });

    test('den returnerer 11 dager etter periodeslutt for 2020-12-25', () => {
        const iDag = new Date('2020-12-25');
        const dager = beregnDagerEtterFastsattMeldedag(iDag, meldekortHistore);
        expect(dager).toBe(11);
    });

    test('den returnerer -2 dager etter periodeslutt for 2020-12-26', () => {
        const iDag = new Date('2020-12-26');
        const dager = beregnDagerEtterFastsattMeldedag(iDag, meldekortHistore);
        expect(dager).toBe(-2);
    });

    test('den returnerer 7 dager etter periodeslutt for 2021-01-04', () => {
        const iDag = new Date('2021-01-04');
        const dager = beregnDagerEtterFastsattMeldedag(iDag, meldekortHistore);
        expect(dager).toBe(7);
    });

    test('den returnerer 9 dager etter periodeslutt for 2021-01-06', () => {
        const iDag = new Date('2021-01-06');
        const dager = beregnDagerEtterFastsattMeldedag(iDag, meldekortHistore);
        expect(dager).toBe(9);
    });
});

describe('tester beregning av meldegruppe for neste meldekort', () => {
    test('den returnerer riktig meldegruppe for neste meldekort', () => {
        const iDag = new Date('2021-01-06');
        const meldegruppe = hentMeldegruppeForNesteMeldekort(iDag, meldekortHistore);
        expect(meldegruppe).toBe('ARBS');
    });

    test('den returnerer null for brukere uten meldekort', () => {
        const iDag = new Date('2021-01-06');
        const meldegruppe = hentMeldegruppeForNesteMeldekort(iDag, null);
        expect(meldegruppe).toBeNull();
    });

    test('den returnerer null når vi ikke har neste meldekort', () => {
        const iDag = new Date('2021-01-06');
        const meldegruppe = hentMeldegruppeForNesteMeldekort(iDag, { meldekort: [] });
        expect(meldegruppe).toBeNull();
    });
});
