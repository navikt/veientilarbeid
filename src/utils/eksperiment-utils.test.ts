import { hentEksperimenter } from './eksperiment-utils';

describe('tester funksjonaliteten for hentEksperimenter', () => {
    test('returnerer riktig liste for samarbeidskontoret Tasta', () => {
        expect(
            hentEksperimenter({
                geografiskTilknytning: '110302',
                registreringsDato: new Date('2021-04-13'),
                enhetEksperimentId: 123,
            })
        ).toStrictEqual(['fullførknappIntro', 'onboarding14a']);
    });
    test('returnerer tom liste for ikke-samarbeidskontoret Færder', () => {
        expect(
            hentEksperimenter({
                geografiskTilknytning: '3811',
                registreringsDato: new Date('2021-04-13'),
                enhetEksperimentId: 123,
            })
        ).toStrictEqual(['fullførknappIntro']);
    });
});

describe('tester funksjonaliteten for A/B-testing', () => {
    test('returnerer A/B-test for fullførknapp for oddetalls-ID', () => {
        expect(hentEksperimenter({ enhetEksperimentId: 123 })).toStrictEqual(['fullførknappIntro']);
    });

    test('returnerer A/B-test for nesteknapp for partalls-ID', () => {
        expect(hentEksperimenter({ enhetEksperimentId: 124 })).toStrictEqual(['nesteknappIntro']);
    });
});
