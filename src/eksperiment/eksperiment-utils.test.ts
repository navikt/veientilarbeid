import { hentEksperimenter } from './eksperiment-utils';
import { DinSituasjonSvar } from '../hooks/use-brukerregistrering-data';

describe('tester funksjonaliteten for hentEksperimenter', () => {
    test('returnerer riktig liste for samarbeidskontoret Tasta', () => {
        expect(
            hentEksperimenter({
                geografiskTilknytning: '110302',
                registreringsDato: new Date('2021-04-13'),
                dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
                enhetEksperimentId: 123,
            }),
        ).toStrictEqual(['fullførknappIntro', 'onboarding14a']);
    });
    test('returnerer tom liste for ikke-samarbeidskontoret Færder', () => {
        expect(
            hentEksperimenter({
                geografiskTilknytning: '3811',
                registreringsDato: new Date('2021-04-13'),
                enhetEksperimentId: 123,
            }),
        ).toStrictEqual(['fullførknappIntro']);
    });
});
