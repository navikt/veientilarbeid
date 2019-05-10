import { finnAntallTimerSidenRegistrering } from './egenvurdering';

describe('finnAntallTimerSidenRegistrering', () => {
    let naatid: Date;

    beforeEach(() => {
        naatid = new Date();
    });

    it('skal returnere 1 time hvis det er 10 minutter siden registrering ', () => {
        const registreringstidspunktMs = naatid.setMinutes(naatid.getMinutes() - 10);
        const registreringstidspunkt = new Date(registreringstidspunktMs);
        const expected = 1;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 1 time hvis det er 30 minutter siden registrering', () => {
        const registreringstidspunktMs = naatid.setMinutes(naatid.getMinutes() - 30);
        const registreringstidspunkt = new Date(registreringstidspunktMs);
        const expected = 1;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 1 time hvis det er 60 minutter siden registrering', () => {
        const registreringstidspunktMs = naatid.setMinutes(naatid.getMinutes() - 60);
        const registreringstidspunkt = new Date(registreringstidspunktMs);
        const expected = 1;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 2 timer hvis det er 61 minutter siden registrering', () => {
        const registreringstidspunktMs = naatid.setMinutes(naatid.getMinutes() - 61);
        const registreringstidspunkt = new Date(registreringstidspunktMs);
        const expected = 2;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 2 timer hvis det er to timer siden registrering', () => {
        const registreringstidspunktMs = naatid.setMinutes(naatid.getMinutes() - 120);
        const registreringstidspunkt = new Date(registreringstidspunktMs);
        const expected = 2;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });

    it('skal returnere 24 timer hvis det er 1 dag (24 timer) siden registrering', () => {
        const registreringstidspunktMs = naatid.setMinutes(naatid.getMinutes() - 1440);
        const registreringstidspunkt = new Date(registreringstidspunktMs);
        const expected = 24;
        const timer = finnAntallTimerSidenRegistrering(registreringstidspunkt);

        expect(timer).toEqual(expected);
    });
});
