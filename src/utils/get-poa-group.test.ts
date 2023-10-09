import getPoaGroup from './get-poa-group';
import { DinSituasjonSvar } from '../hooks/use-brukerregistrering-data';

describe('getPoaGroup returnerer forventede verdier', () => {
    it('returnerer kss for standard, IVURD, mistet jobben, arbs, rett alder og under 12 uker', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            innsatsgruppe: 'STANDARD_INNSATS',
            formidlingsgruppe: 'ARBS',
            alder: 32,
            servicegruppe: 'IVURD',
            opprettetRegistreringDato: new Date(),
        };
        expect(getPoaGroup(data)).toBe('kss');
    });

    it('returnerer kss for situasjonsbestemt, IKVAL, mistet jobben, arbs, rett alder og under 12 uker', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
            formidlingsgruppe: 'ARBS',
            alder: 30,
            servicegruppe: 'IKVAL',
            opprettetRegistreringDato: new Date(),
        };
        expect(getPoaGroup(data)).toBe('kss');
    });

    it('returnerer kss for situasjonsbestemt, IKVAL, sagt opp jobben, arbs, rett alder og under 12 uker', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.HAR_SAGT_OPP,
            innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
            formidlingsgruppe: 'ARBS',
            alder: 32,
            servicegruppe: 'IKVAL',
            opprettetRegistreringDato: new Date(),
        };
        expect(getPoaGroup(data)).toBe('kss');
    });

    it('returnerer boo for situasjonsbestemt, IKVAL, sagt opp jobben, arbs, rett alder og under 12 uker', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.ER_PERMITTERT,
            innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
            formidlingsgruppe: 'ARBS',
            alder: 32,
            servicegruppe: 'IKVAL',
            opprettetRegistreringDato: new Date(),
        };
        expect(getPoaGroup(data)).toBe('boo');
    });

    it('returnerer boo for standard, mistet jobben, arbs, rett alder og over 12 uker', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            innsatsgruppe: 'STANDARD_INNSATS',
            formidlingsgruppe: 'ARBS',
            alder: 32,
            servicegruppe: 'IVURD',
            opprettetRegistreringDato: new Date('2020-01-13'),
        };
        expect(getPoaGroup(data)).toBe('boo');
    });

    it('returnerer boo for standard, mistet jobben, arbs, rett alder og dato null', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            innsatsgruppe: 'STANDARD_INNSATS',
            formidlingsgruppe: 'ARBS',
            alder: 32,
            servicegruppe: 'IVURD',
            opprettetRegistreringDato: null,
        };
        expect(getPoaGroup(data)).toBe('boo');
    });

    it('returnerer boo for standard, mistet jobben, arbs, alder under 30 og under 12 uker', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            innsatsgruppe: 'STANDARD_INNSATS',
            formidlingsgruppe: 'ARBS',
            alder: 29,
            servicegruppe: 'IVURD',
            opprettetRegistreringDato: new Date(),
        };
        expect(getPoaGroup(data)).toBe('boo');
    });

    it('returnerer boo for standard, mistet jobben, arbs, alder over 50 og under 12 uker', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            innsatsgruppe: 'STANDARD_INNSATS',
            formidlingsgruppe: 'ARBS',
            alder: 56,
            servicegruppe: 'IVURD',
            opprettetRegistreringDato: new Date(),
        };
        expect(getPoaGroup(data)).toBe('boo');
    });

    it('returnerer boo for standard, mistet jobben, iarbs, rett alder og under 12 uker', () => {
        const data = {
            dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            innsatsgruppe: 'STANDARD_INNSATS',
            formidlingsgruppe: 'IARBS',
            alder: 32,
            servicegruppe: 'IVURD',
            opprettetRegistreringDato: new Date(),
        };
        expect(getPoaGroup(data)).toBe('boo');
    });
});
