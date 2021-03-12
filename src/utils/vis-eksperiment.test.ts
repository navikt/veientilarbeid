import visEksperiment from './vis-eksperiment';

describe('tester funksjonaliteten for visEksperiment', () => {
    test('returnerer true for Notododden og onboardingMeldekort', () => {
        const data = {
            geografiskTilknytning: '3808',
            eksperiment: 'onboardingMeldekort',
        };
        expect(visEksperiment(data)).toBe(true);
    });

    test('returnerer false for Notododden og tilfeldigEksperiment', () => {
        const data = {
            geografiskTilknytning: '3808',
            eksperiment: 'tilfeldigEksperiment',
        };
        expect(visEksperiment(data)).toBe(false);
    });

    test('returnerer false for Færder og onboardingMeldekort', () => {
        const data = {
            geografiskTilknytning: '3811',
            eksperiment: 'onboardingMeldekort',
        };
        expect(visEksperiment(data)).toBe(false);
    });
});
