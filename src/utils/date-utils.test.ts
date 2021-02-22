import { foerstkommendeMandag, hentISOUke } from './date-utils';

describe('Utregning av ISO-uke', () => {
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

describe('Utregning av førstkommende mandag', () => {
    it('overgang fra vintertid til sommertid', () => {
        expect(foerstkommendeMandag(new Date('2021-03-28'))).toEqual(new Date('2021-03-29'));
        expect(foerstkommendeMandag(new Date('2021-03-29'))).toEqual(new Date('2021-04-05'));
    });

    it('overgang fra sommertid til vintertid', () => {
        expect(foerstkommendeMandag(new Date('2021-10-31'))).toStrictEqual(new Date('2021-11-01'));
        expect(foerstkommendeMandag(new Date('2021-11-01'))).toStrictEqual(new Date('2021-11-08'));
    });

    it('uke 7 i 2021', () => {
        expect(foerstkommendeMandag(new Date('2021-02-15'))).toStrictEqual(new Date('2021-02-22'));
        expect(foerstkommendeMandag(new Date('2021-02-16'))).toStrictEqual(new Date('2021-02-22'));
        expect(foerstkommendeMandag(new Date('2021-02-17'))).toStrictEqual(new Date('2021-02-22'));
        expect(foerstkommendeMandag(new Date('2021-02-18'))).toStrictEqual(new Date('2021-02-22'));
        expect(foerstkommendeMandag(new Date('2021-02-19'))).toStrictEqual(new Date('2021-02-22'));
        expect(foerstkommendeMandag(new Date('2021-02-20'))).toStrictEqual(new Date('2021-02-22'));
        expect(foerstkommendeMandag(new Date('2021-02-21'))).toStrictEqual(new Date('2021-02-22'));
    });
});
