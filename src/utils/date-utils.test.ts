import { hentISOUke } from './date-utils';

describe('Utretning av ISO-uke', () => {
    it('returnerer uke 53 som siste uke av desember 2020', () => {
        expect(hentISOUke('2020-12-31')).toBe(53);
        expect(hentISOUke('2021-01-1')).toBe(53);
    });

    it('returnerer uke 41 for en tilfeldig høstferie i 2020', () => {
        expect(hentISOUke('2020-10-05')).toBe(41);
        expect(hentISOUke('2020-10-09')).toBe(41);
    });

    it('returnerer ukenummer for årsskifte 2021-2022', () => {
        expect(hentISOUke('2021-12-31')).toBe(52);
        expect(hentISOUke('2022-01-01')).toBe(52);
        expect(hentISOUke('2022-01-02')).toBe(52);
        expect(hentISOUke('2022-01-03')).toBe(1);
    });
});
