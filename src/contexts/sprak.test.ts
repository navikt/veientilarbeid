import { hentSprakFraUrl } from './sprak';

describe('hentSprakFraUrl', () => {
    test('returnerer en for /en url-er', () => {
        expect(hentSprakFraUrl('https://www.intern.dev.nav.no/minside/en')).toBe('en');
    });
    test('returnerer en for /en/ url-er', () => {
        expect(hentSprakFraUrl('https://www.intern.dev.nav.no/minside/en/')).toBe('en');
    });
    test('returnerer nn for /nn', () => {
        expect(hentSprakFraUrl('https://www.intern.dev.nav.no/minside/nn')).toBe('nn');
    });
    test('returnerer nn for /nn/', () => {
        expect(hentSprakFraUrl('https://www.intern.dev.nav.no/minside/nn/test')).toBe('nn');
    });
    test('returnerer nb for /nb', () => {
        expect(hentSprakFraUrl('https://www.intern.dev.nav.no/minside/nb')).toBe('nb');
    });
    test('returnerer nb for /nb/', () => {
        expect(hentSprakFraUrl('https://www.intern.dev.nav.no/minside/nb/test')).toBe('nb');
    });
    test('returnerer undefined for ingen sprak i url', () => {
        expect(hentSprakFraUrl('https://www.intern.dev.nav.no/minside')).toBe(undefined);
    });
});
