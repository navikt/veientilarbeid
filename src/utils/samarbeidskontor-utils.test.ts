import { visEksperiment, erSamarbeidskontor, hentEksperimenter } from './samarbeidskontor-utils';

describe('tester funksjonaliteten for visEksperiment', () => {
    test('returnerer true for Notodden og onboardingMeldekort', () => {
        expect(
            visEksperiment({
                geografiskTilknytning: '3808',
                eksperiment: 'onboardingMeldekort',
            })
        ).toBe(true);
    });

    test('returnerer false for Notodden og dummyEksperiment', () => {
        expect(
            visEksperiment({
                geografiskTilknytning: '3808',
                eksperiment: 'dummyEksperiment',
            })
        ).toBe(false);
    });

    test('returnerer false for Færder og onboardingMeldekort', () => {
        expect(
            visEksperiment({
                geografiskTilknytning: '3811',
                eksperiment: 'onboardingMeldekort',
            })
        ).toBe(false);
    });

    test('returnerer false for manglende geografiskTilknytning', () => {
        expect(
            visEksperiment({
                eksperiment: 'onboardingMeldekort',
            })
        ).toBe(false);
    });
});

describe('tester funksjonaliteten for erSamarbeidskontor', () => {
    test('returnerer true for Notodden', () => {
        expect(erSamarbeidskontor('3808')).toBe(true);
    });
    test('returnerer false for Færder', () => {
        expect(erSamarbeidskontor('3811')).toBe(false);
    });
    test('returnerer false for manglende geografiskTilknytning', () => {
        expect(erSamarbeidskontor(undefined)).toBe(false);
    });
});

describe('tester funksjonaliteten for hentEksperimenter', () => {
    test('returnerer riktig liste for samarbeidskontoret Notodden', () => {
        expect(hentEksperimenter({ geografiskTilknytning: '3808' })).toStrictEqual(['onboardingMeldekort']);
    });
    test('returnerer tom liste for ikke-samarbeidskontoret Færder', () => {
        expect(hentEksperimenter({ geografiskTilknytning: '3811' })).toStrictEqual([]);
    });
    test('returnerer tom liste for manglende geografiskTilknytning', () => {
        expect(hentEksperimenter({})).toStrictEqual([]);
    });
});
