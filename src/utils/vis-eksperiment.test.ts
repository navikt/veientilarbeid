import visEksperiment from './vis-eksperiment';

describe('tester funksjonaliteten for visEksperiment', () => {
    test('returnerer true for Notododden og onboardingMeldekort', () => {
        expect(
            visEksperiment({
                geografiskTilknytning: '3808',
                eksperiment: 'onboardingMeldekort',
            })
        ).toBe(true);
    });

    test('returnerer false for Notododden og dummyEksperiment', () => {
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
