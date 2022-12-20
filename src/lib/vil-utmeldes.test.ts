import { ReaktiveringEllerNull } from './vis-automatisk-reaktiverings-kort';
import { vilUtmeldes } from './vil-utmeldes';

describe('Tester vilUtmeldes-funksjonen', () => {
    test('returnerer TRUE dersom svaret er nei', () => {
        const reaktivering = {
            opprettetDato: new Date().toISOString().substring(0, 10),
            svar: {
                opprettetDato: new Date().toISOString().substring(0, 10),
                svar: 'nei',
            },
        } as ReaktiveringEllerNull;
        const resultat = vilUtmeldes(reaktivering);
        const forventetResultat = true;
        expect(resultat).toBe(forventetResultat);
    });

    test('returnerer FALSE dersom svaret er ja', () => {
        const reaktivering = {
            opprettetDato: new Date().toISOString().substring(0, 10),
            svar: {
                opprettetDato: new Date().toISOString().substring(0, 10),
                svar: 'ja',
            },
        } as ReaktiveringEllerNull;
        const resultat = vilUtmeldes(reaktivering);
        const forventetResultat = false;
        expect(resultat).toBe(forventetResultat);
    });

    test('returnerer FALSE dersom svaret ikke er avgitt', () => {
        const reaktivering = {
            opprettetDato: new Date().toISOString().substring(0, 10),
            svar: null,
        } as ReaktiveringEllerNull;
        const resultat = vilUtmeldes(reaktivering);
        const forventetResultat = false;
        expect(resultat).toBe(forventetResultat);
    });

    test('returnerer FALSE dersom reaktivering er null', () => {
        const reaktivering = null as ReaktiveringEllerNull;
        const resultat = vilUtmeldes(reaktivering);
        const forventetResultat = false;
        expect(resultat).toBe(forventetResultat);
    });
});
