import hentTekstnokkelForOnboardingTrinn1 from './hent-tekstnokkel-for-onboarding-trinn1';
import { datoUtenTid, plussDager } from '../utils/date-utils';

describe('hentTestnokkelForOnboardingTrinn1', () => {
    it('returnerer "trinn1" uten dato', () => {
        expect(hentTekstnokkelForOnboardingTrinn1()).toEqual('trinn1');
    });

    it('returnerer "trinn1-fortid" når dato er tilbake i tid', () => {
        expect(hentTekstnokkelForOnboardingTrinn1(plussDager(new Date(), -10).toISOString())).toBe('trinn1Fortid');
    });

    it('returnerer "trinn1-idag" når dato er idag', () => {
        expect(hentTekstnokkelForOnboardingTrinn1(datoUtenTid(new Date().toISOString()).toISOString())).toBe(
            'trinn1Idag'
        );
    });

    it('returnerer "trinn1-fremtid" når dato er frem i tid', () => {
        expect(hentTekstnokkelForOnboardingTrinn1(plussDager(new Date(), 7).toISOString())).toBe('trinn1Fremtid');
    });
});
