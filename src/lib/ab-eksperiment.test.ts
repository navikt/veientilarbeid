import { hentEksperimenter } from '../utils/eksperiment-utils';

describe('tester funksjonaliteten for A/B-testing', () => {
    test('returnerer A/B-test for fullførknapp for oddetalls-ID', () => {
        expect(hentEksperimenter({ enhetEksperimentId: 123 })).toStrictEqual(['fullførknappIntro']);
    });

    test('returnerer A/B-test for nesteknapp for partalls-ID', () => {
        expect(hentEksperimenter({ enhetEksperimentId: 124 })).toStrictEqual(['nesteknappIntro']);
    });
});
