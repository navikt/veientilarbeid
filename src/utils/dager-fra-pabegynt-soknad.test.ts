import dagerFraPabegyntSoknad from './dager-fra-pabegynt-soknad';
import { Soknad } from '../ducks/paabegynte-soknader';

describe('tester funksjonen dagerFraPabegyntSoknad', () => {
    test('den returnerer INGEN_DATO når det ikke finnes søknader', () => {
        const soknader: Soknad[] = [];
        const registreringsDato = new Date('2021-06-02');
        const antallDagerFraPabegyntSoknad = dagerFraPabegyntSoknad({
            soknader,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe('INGEN_DATA');
    });

    test('den returnerer INGEN_DATO når det ikke finnes registreringsdato', () => {
        const soknader = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQGA',
                dato: '2021-04-06T11:54:38.771+02:00',
                kilde: 'HENVENDELSE',
            },
        ];
        const registreringsDato = null;
        const antallDagerFraPabegyntSoknad = dagerFraPabegyntSoknad({
            soknader,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe('INGEN_DATA');
    });

    test('den returnerer 0 når nyeste søknad er samme som registreringsdato', () => {
        const soknader = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQGA',
                dato: '2021-04-01T11:54:38.771+02:00',
                kilde: 'HENVENDELSE',
            },
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQGA',
                dato: '2021-06-01T11:54:38.771+02:00',
                kilde: 'HENVENDELSE',
            },
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQGA',
                dato: '2021-05-01T11:54:38.771+02:00',
                kilde: 'HENVENDELSE',
            },
        ];
        const registreringsDato = new Date('2021-06-01');
        const antallDagerFraPabegyntSoknad = dagerFraPabegyntSoknad({
            soknader,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe(0);
    });

    test('den returnerer 1 når nyeste søknad er dagen etter registreringsdato', () => {
        const soknader = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQGA',
                dato: '2021-06-02T11:54:38.771+02:00',
                kilde: 'HENVENDELSE',
            },
        ];
        const registreringsDato = new Date('2021-06-01');
        const antallDagerFraPabegyntSoknad = dagerFraPabegyntSoknad({
            soknader,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe(1);
    });

    test('den returnerer -1 når nyeste søknad er dagen før registreringsdato', () => {
        const soknader = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQGA',
                dato: '2021-05-31T11:54:38.771+02:00',
                kilde: 'HENVENDELSE',
            },
        ];
        const registreringsDato = new Date('2021-06-01');
        const antallDagerFraPabegyntSoknad = dagerFraPabegyntSoknad({
            soknader,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe(-1);
    });
});
