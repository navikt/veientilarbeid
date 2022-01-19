import lagHentTekstForSprak from '../lib/lag-hent-tekst-for-sprak';

describe('Hent tekst for språk', () => {
    const TEKSTER = {
        nb: {
            test1: 'Test1 norsk',
            test2: 'Test2 norsk',
        },
        en: {
            test1: 'Test1 en',
        },
    };

    test('Henter engelsk tekst', () => {
        const hentTekst = lagHentTekstForSprak(TEKSTER, 'en');
        expect(hentTekst('test1')).toBe('Test1 en');
    });

    test('Fallbacker til norsk', () => {
        const hentTekst = lagHentTekstForSprak(TEKSTER, 'en');
        expect(hentTekst('test2')).toBe('Test2 norsk');
    });
});
