import isKSSKontroll from './is-kss-kontroll';
import getPoaGroup from '../utils/get-poa-group';
import { POAGruppe } from '../utils/get-poa-group';
import { DinSituasjonSvar } from '../hooks/use-brukerregistrering-data';

const generateKSS = (): POAGruppe => {
    const data = {
        dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
        innsatsgruppe: 'STANDARD_INNSATS',
        formidlingsgruppe: 'ARBS',
        alder: 32,
        servicegruppe: 'IVURD',
        opprettetRegistreringDato: new Date(),
    };
    return getPoaGroup(data);
};

const generateBOO = (): POAGruppe => {
    const data = {
        dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
        innsatsgruppe: 'STANDARD_INNSATS',
        formidlingsgruppe: 'IARBS',
        alder: 32,
        servicegruppe: 'IVURD',
        opprettetRegistreringDato: new Date(),
    };
    return getPoaGroup(data);
};

describe('isKSSKontroll returnerer forventede verdier', () => {
    it('returnerer true for kss fra gyldig kontor registrert i dag med gyldig situasjon', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date(),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '1149',
        };
        expect(isKSSKontroll(data)).toBe(true);
    });

    it('returnerer false for kss fra gyldig kontor med ugyldig dato med gyldig situasjon', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: null,
            POAGruppe: generateKSS(),
            geografiskTilknytning: '1149',
        };
        expect(isKSSKontroll(data)).toBe(false);
    });

    it('returnerer false for boo fra gyldig kontor registrert i dag', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date(),
            POAGruppe: generateBOO(),
            geografiskTilknytning: '1149',
        };
        expect(isKSSKontroll(data)).toBe(false);
    });

    it('returnerer false for kss fra gyldig kontor registrert i dag med ugyldig situasjon', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.ER_PERMITTERT,
            opprettetRegistreringDato: new Date(),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '1149',
        };
        expect(isKSSKontroll(data)).toBe(false);
    });

    it('returnerer false for kss fra ugyldig kontor registrert i dag', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date(),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3808',
        };
        expect(isKSSKontroll(data)).toBe(false);
    });
});
