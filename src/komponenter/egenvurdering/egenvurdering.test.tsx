import { finnAntallTimerSidenRegistrering } from './egenvurdering';

describe('finnAntallTimerSidenRegistrering', () => {
    let naatid: Date;

    beforeEach(() => {
        naatid = new Date();
    });

    it('skal returnere 0 timer hvis det er mindre enn en halvtime (10 minutter) siden registrering ', () => {
        const registreringstidspunkt_ms = naatid.setMinutes(naatid.getMinutes() - 10);
        const registreringstidspunkt = new Date(registreringstidspunkt_ms);
        const expected = 0;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 1 timer hvis det er en halvtime (30 minutter) siden registrering', () => {
        const registreringstidspunkt_ms = naatid.setMinutes(naatid.getMinutes() - 30);
        const registreringstidspunkt = new Date(registreringstidspunkt_ms);
        const expected = 1;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 2 timer hvis det er to timer siden registrering', () => {
        const registreringstidspunkt_ms = naatid.setMinutes(naatid.getMinutes() - 120);
        const registreringstidspunkt = new Date(registreringstidspunkt_ms);
        const expected = 2;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 24 timer hvis det er 1 dag (24 timer) siden registrering', () => {
        const registreringstidspunkt_ms = naatid.setMinutes(naatid.getMinutes() - 1440);
        const registreringstidspunkt = new Date(registreringstidspunkt_ms);
        const expected = 24;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 240 timer hvis det er 10 dager siden registrering', () => {
        const registreringstidspunkt_ms = naatid.setMinutes(naatid.getMinutes() - 14400);
        const registreringstidspunkt = new Date(registreringstidspunkt_ms);
        const expected = 240;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });
});
