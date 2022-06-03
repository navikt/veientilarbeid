import beregnArbeidssokerperioder from './beregn-arbeidssokerperioder';
import dagerFraDato from '../utils/dager-fra-dato';

describe('tester funksjonen beregnArbeidssokerperioder', () => {
    test('Vi får default verdier tilbake dersom data ikke er hentet', () => {
        const data = {
            perioder: null,
        };
        const forventetVerdi = {
            harAktivArbeidssokerperiode: 'INGEN_DATA',
            antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
            antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
            antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
        };
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi).toEqual(forventetVerdi);
    });

    test('Vi får N/A verdier tilbake dersom data er tom', () => {
        const data = {
            perioder: [] as any,
        };
        const forventetVerdi = {
            harAktivArbeidssokerperiode: 'N/A',
            antallDagerSidenSisteArbeidssokerperiode: 'N/A',
            antallUkerSidenSisteArbeidssokerperiode: 'N/A',
            antallUkerMellomSisteArbeidssokerperioder: 'N/A',
        };
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi).toEqual(forventetVerdi);
    });

    test('Vi får Ja på aktiv arbeidssøkerperiode om perioden ikke er avsluttet', () => {
        const data = {
            perioder: [
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

    test('Vi får Nei på aktiv arbeidssøkerperiode om perioden ikke er avsluttet', () => {
        const data = {
            perioder: [
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
            perioder: [
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
            perioder: [
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
            perioder: [
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
            perioder: [
                {
                    fraOgMedDato: '2020-01-01',
                    tilOgMedDato: '2020-02-01',
                },
            ],
        };
        const forventetVerdi = dagerFraDato(new Date(data.perioder[0].tilOgMedDato));
        const verdi = beregnArbeidssokerperioder(data);

        expect(verdi.antallDagerSidenSisteArbeidssokerperiode).toEqual(forventetVerdi);
    });
});
