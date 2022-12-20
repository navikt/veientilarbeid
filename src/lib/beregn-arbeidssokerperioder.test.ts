import beregnArbeidssokerperioder from './beregn-arbeidssokerperioder';
import dagerFraDato from '../utils/dager-fra-dato';

describe('tester funksjonen beregnArbeidssokerperioder', () => {
    test('Vi får default verdier tilbake dersom data ikke er hentet', () => {
        const data = null;

        const forventetVerdi = {
            harAktivArbeidssokerperiode: 'INGEN_DATA',
            aktivPeriodeStart: 'INGEN_DATA',
            antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
            antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
            antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
            forrigePeriodeAvsluttetDato: 'INGEN_DATA',
        };

        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi).toEqual(forventetVerdi);
    });

    test('Vi får N/A verdier tilbake dersom data er tom', () => {
        const data = {
            arbeidssokerperioder: [],
        };
        const forventetVerdi = {
            harAktivArbeidssokerperiode: 'N/A',
            aktivPeriodeStart: 'N/A',
            antallDagerSidenSisteArbeidssokerperiode: 'N/A',
            antallUkerSidenSisteArbeidssokerperiode: 'N/A',
            antallUkerMellomSisteArbeidssokerperioder: 'N/A',
            forrigePeriodeAvsluttetDato: 'N/A',
        };
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi).toEqual(forventetVerdi);
    });

    test('Vi får Ja på aktiv arbeidssøkerperiode om perioden ikke er avsluttet', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: null,
                },
            ],
        };
        const forventetVerdi = 'Ja';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.harAktivArbeidssokerperiode).toEqual(forventetVerdi);
    });

    test('Vi får Ja på aktiv arbeidssøkerperiode om perioden ikke er avsluttet', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-01-01',
                },
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: null,
                },
            ],
        };
        const forventetVerdi = 'Ja';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.harAktivArbeidssokerperiode).toEqual(forventetVerdi);
    });

    test('Vi får aktivPeriodeStart lik fraOgMedDato perioden ikke er avsluttet', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: null,
                },
            ],
        };
        const forventetVerdi = '2020-01-01';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.aktivPeriodeStart).toEqual(forventetVerdi);
    });

    test('Vi får "Ingen aktive perioder" på aktivPeriodeStart dersom siste periode er avsluttet', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-05-05',
                },
            ],
        };
        const forventetVerdi = 'Ingen aktive perioder';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.aktivPeriodeStart).toEqual(forventetVerdi);
    });

    test('Vi får Nei på aktiv arbeidssøkerperiode om perioden ikke er avsluttet', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
            ],
        };
        const forventetVerdi = 'Nei';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.harAktivArbeidssokerperiode).toEqual(forventetVerdi);
    });

    test('Vi får Ja på aktiv arbeidssøkerperiode om siste perioden ikke er avsluttet', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
                {
                    fraOgMedDato: '2021-01-01',
                    tilOgMedDato: null,
                },
            ],
        };
        const forventetVerdi = 'Ja';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.harAktivArbeidssokerperiode).toEqual(forventetVerdi);
    });

    test('Vi får Nei på aktiv arbeidssøkerperiode om perioden ikke er avsluttet', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
                {
                    fraOgMedDato: '2020-02-01',
                    tilOgMedDato: '2020-03-01',
                },
            ],
        };
        const forventetVerdi = 'Nei';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.harAktivArbeidssokerperiode).toEqual(forventetVerdi);
    });

    test('Vi får ikke avsluttet på dager og uker siden siste periode om det finnes aktiv arbeidssøkerperiode', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
                {
                    fraOgMedDato: '2021-01-01',
                    tilOgMedDato: null,
                },
            ],
        };
        const forventetVerdi = 'Ikke avsluttet';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.antallDagerSidenSisteArbeidssokerperiode).toEqual(forventetVerdi);
        expect(verdi.antallUkerSidenSisteArbeidssokerperiode).toEqual(forventetVerdi);
    });

    test('Vi riktig antall dager på antall dager fra siste arbeidssøkerperiode', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
            ],
        };
        const forventetVerdi = dagerFraDato(new Date(data.arbeidssokerperioder[0].tilOgMedDato));
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.antallDagerSidenSisteArbeidssokerperiode).toEqual(forventetVerdi);
    });

    test('Returnerer "Første periode" for uker mellom perioder dersom man kun har en periode', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
            ],
        };
        const forventetVerdi = 'Første periode';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.antallUkerMellomSisteArbeidssokerperioder).toEqual(forventetVerdi);
    });

    test('Returnerer 4 for uker mellom perioder dersom det er 4 uker mellom ;-)', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
                {
                    fraOgMedDato: '2020-03-01',
                    tilOgMedDato: null,
                },
            ],
        };
        const forventetVerdi = 4;
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.antallUkerMellomSisteArbeidssokerperioder).toEqual(forventetVerdi);
    });

    test('Returnerer forventet dato for avsluttet forrige periode', () => {
        const data = {
            arbeidssokerperioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
                {
                    fraOgMedDato: '2020-03-01',
                    tilOgMedDato: null,
                },
            ],
        };
        const forventetVerdi = '2020-02-01';
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.forrigePeriodeAvsluttetDato).toEqual(forventetVerdi);
    });
});
