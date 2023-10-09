import isKSSEksperiment from './is-kss-eksperiment';
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

describe('isKSSEksperiment returnerer forventede verdier', () => {
    it('returnerer true for kss fra gyldig kontor registrert etter eksperimentets start med gyldig situasjon', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date('2020-10-27'),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3401',
        };
        expect(isKSSEksperiment(data)).toBe(true);
    });

    it('returnerer false for kss fra gyldig kontor registrert etter eksperimentets slutt med gyldig situasjon', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date('2020-11-30'),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3401',
        };
        expect(isKSSEksperiment(data)).toBe(false);
    });

    it('returnerer false for kss fra gyldig kontor fra andre runde eksperiment-kontorer mellom første og andre eksperiment-start', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date('2020-10-21'),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3808',
        };
        expect(isKSSEksperiment(data)).toBe(false);
    });

    it('returnerer true for kss fra gyldig kontor fra andre runde eksperiment-kontorer', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date('2020-10-26'),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3808',
        };
        expect(isKSSEksperiment(data)).toBe(true);
    });

    it('returnerer false for kss fra gyldig kontor fra andre runde eksperiment-kontorer etter slutt', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date('2020-11-30'),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3808',
        };
        expect(isKSSEksperiment(data)).toBe(false);
    });

    it('returnerer false for kss fra gyldig kontor registrert før eksperimentets start, men med gyldig situasjon', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date('2020-09-06'),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3401',
        };
        expect(isKSSEksperiment(data)).toBe(false);
    });

    it('returnerer false for kss fra gyldig kontor med ugyldig dato med gyldig situasjon', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: null,
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3401',
        };
        expect(isKSSEksperiment(data)).toBe(false);
    });

    it('returnerer false for boo fra gyldig kontor registrert i dag', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date(),
            POAGruppe: generateBOO(),
            geografiskTilknytning: '3401',
        };
        expect(isKSSEksperiment(data)).toBe(false);
    });

    it('returnerer false for kss fra gyldig kontor registrert i dag med ugyldig situasjon', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.ER_PERMITTERT,
            opprettetRegistreringDato: new Date(),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '3401',
        };
        expect(isKSSEksperiment(data)).toBe(false);
    });

    it('returnerer false for kss fra ugyldig kontor registrert i dag', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            opprettetRegistreringDato: new Date(),
            POAGruppe: generateKSS(),
            geografiskTilknytning: '0807',
        };
        expect(isKSSEksperiment(data)).toBe(false);
    });
});
