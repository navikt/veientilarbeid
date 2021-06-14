import beregnDagpengerStatus from './beregn-dagpenger-status';

describe('tester funksjonen beregnDagpengerStatus', () => {
    test('returnerer ukjentStatus uten input', () => {
        const status = beregnDagpengerStatus({});
        expect(status).toBe('ukjentStatus');
    });

    test('returnerer mottarDagpenger når rettighetsgruppe er DAGP', () => {
        const status = beregnDagpengerStatus({
            rettighetsgruppe: 'DAGP',
        });
        expect(status).toBe('mottarDagpenger');
    });

    test('returnerer harPaabegynteSoknader når det er påbegynte søknader etter registreringsdato', () => {
        const opprettetRegistreringDato = new Date('2021-06-01');
        const paabegynteSoknader = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQX9',
                dato: '2021-06-02T15:48:19.375+02:00',
                kilde: 'HENVENDELSE',
            },
        ];
        const status = beregnDagpengerStatus({
            rettighetsgruppe: 'ITY',
            opprettetRegistreringDato,
            paabegynteSoknader,
        });
        expect(status).toBe('harPaabegynteSoknader');
    });

    test('returnerer ukjentStatus når det er påbegynte søknader etter registreringsdato men registreringsdato er ukjent', () => {
        const opprettetRegistreringDato = null;
        const paabegynteSoknader = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQX9',
                dato: '2021-06-02T15:48:19.375+02:00',
                kilde: 'HENVENDELSE',
            },
        ];
        const status = beregnDagpengerStatus({
            rettighetsgruppe: 'ITY',
            opprettetRegistreringDato,
            paabegynteSoknader,
        });
        expect(status).toBe('ukjentStatus');
    });

    test('returnerer ukjentStatus når det er påbegynte søknader før registreringsdato', () => {
        const opprettetRegistreringDato = new Date('2021-06-01');
        const paabegynteSoknader = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQX9',
                dato: '2021-05-31T15:48:19.375+02:00',
                kilde: 'HENVENDELSE',
            },
        ];
        const status = beregnDagpengerStatus({
            rettighetsgruppe: 'ITY',
            opprettetRegistreringDato,
            paabegynteSoknader,
        });
        expect(status).toBe('ukjentStatus');
    });

    test('returnerer soknadUnderBehandling når det er søknader UNDER_BEHANDLING etter registreringsdato', () => {
        const opprettetRegistreringDato = new Date('2021-06-01');
        const behandlingskjeder = [
            {
                status: 'UNDER_BEHANDLING',
                sistOppdatert: '2021-06-02T15:48:19.375+02:00',
            },
        ];
        const status = beregnDagpengerStatus({
            rettighetsgruppe: 'ITY',
            opprettetRegistreringDato,
            behandlingskjeder,
        });
        expect(status).toBe('soknadUnderBehandling');
    });

    test('returnerer soknadFerdigBehandlet når det er søknader FERDIG_BEHANDLET etter registreringsdato og etter UNDER_BEHANDLING', () => {
        const opprettetRegistreringDato = new Date('2021-06-01');
        const behandlingskjeder = [
            {
                status: 'UNDER_BEHANDLING',
                sistOppdatert: '2021-06-02T15:48:19.375+02:00',
            },
            {
                status: 'FERDIG_BEHANDLET',
                sistOppdatert: '2021-06-03T15:48:19.375+02:00',
            },
        ];
        const status = beregnDagpengerStatus({
            rettighetsgruppe: 'ITY',
            opprettetRegistreringDato,
            behandlingskjeder,
        });
        expect(status).toBe('soknadFerdigBehandlet');
    });

    test('returnerer ukjentStatus når det er behandlinger før registreringsdato', () => {
        const opprettetRegistreringDato = new Date('2021-06-01');
        const behandlingskjeder = [
            {
                status: 'UNDER_BEHANDLING',
                sistOppdatert: '2020-06-02T15:48:19.375+02:00',
            },
            {
                status: 'FERDIG_BEHANDLET',
                sistOppdatert: '2020-06-03T15:48:19.375+02:00',
            },
        ];
        const status = beregnDagpengerStatus({
            rettighetsgruppe: 'ITY',
            opprettetRegistreringDato,
            behandlingskjeder,
        });
        expect(status).toBe('ukjentStatus');
    });
});
