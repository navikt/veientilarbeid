import { antallTimerMellomAOgBRundetOpp } from './egenvurdering';

describe('finnAntallTimerSidenRegistrering', () => {
    let naa: Date;

    beforeEach(() => {
        naa = new Date();
    });

    it('skal returnere 1 time hvis registreringstidspunkt er for 40 sekunder siden', () => {
        const naaMS = naa.getTime();
        const registreringstidspunktMs = naaMS - 40 * 1e3;

        const timerBeregnet = antallTimerMellomAOgBRundetOpp(new Date(registreringstidspunktMs), new Date(naaMS));

        expect(timerBeregnet).toEqual(1);
    });

    it('skal returnere 1 time hvis registreringstidspunkt er for 10 minutter siden', () => {
        const naaMS = naa.getTime();
        const registreringstidspunktMs = naaMS - 10 * 6e4;

        const timerBeregnet = antallTimerMellomAOgBRundetOpp(new Date(registreringstidspunktMs), new Date(naaMS));

        expect(timerBeregnet).toEqual(1);
    });

    it('skal returnere 1 time hvis registreringstidspunkt er for 59 minutter siden', () => {
        const naaMS = naa.getTime();
        const registreringstidspunktMs = naaMS - 59 * 6e4;

        const timerBeregnet = antallTimerMellomAOgBRundetOpp(new Date(registreringstidspunktMs), new Date(naaMS));

        expect(timerBeregnet).toEqual(1);
    });

    it('skal returnere 2 timer hvis registreringstidspunkt er for 61 minutter siden', () => {
        const naaMS = naa.getTime();
        const registreringstidspunktMs = naaMS - 61 * 6e4;

        const timerBeregnet = antallTimerMellomAOgBRundetOpp(new Date(registreringstidspunktMs), new Date(naaMS));

        expect(timerBeregnet).toEqual(2);
    });

    it('skal returnere 24 timer hvis registreringstidspunkt er for 23 timer og 30 minutter siden', () => {
        const naaMS = naa.getTime();
        const registreringstidspunktMs = naaMS - (23 * 36e5 + 30 * 6e4);

        const timerBeregnet = antallTimerMellomAOgBRundetOpp(new Date(registreringstidspunktMs), new Date(naaMS));

        expect(timerBeregnet).toEqual(24);
    });
});
