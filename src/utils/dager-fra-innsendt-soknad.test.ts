import dagerFraInnsendtSoknad from './dager-fra-innsendt-soknad';
import { Behandling } from './dager-fra-innsendt-soknad';

describe('tester funksjonen dagerFraInnsendtSoknad', () => {
    test('den returnerer INGEN_DATO når det ikke finnes behandlinger', () => {
        const behandlingskjeder: Behandling[] = [];
        const registreringsDato = new Date('2021-06-02');
        const antallDagerFraPabegyntSoknad = dagerFraInnsendtSoknad({
            behandlingskjeder,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe('INGEN_DATA');
    });

    test('den returnerer INGEN_DATO når det ikke finnes registreringsdato', () => {
        const behandlingskjeder = [
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2021-03-15T09:31:57.507+01:00' },
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2017-03-13T03:18:00.709+01:00' },
            { status: 'UNDER_BEHANDLING', sistOppdatert: '2016-11-17T13:01:40+01:00' },
            { status: 'UNDER_BEHANDLING', sistOppdatert: '2015-10-23T10:19:21+02:00' },
        ];
        const registreringsDato = null;
        const antallDagerFraPabegyntSoknad = dagerFraInnsendtSoknad({
            behandlingskjeder,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe('INGEN_DATA');
    });

    test('den returnerer INGEN_DATO når det ikke finnes noen UNDER_BEHANDLING', () => {
        const behandlingskjeder = [
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2021-03-15T09:31:57.507+01:00' },
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2017-03-13T03:18:00.709+01:00' },
        ];
        const registreringsDato = null;
        const antallDagerFraPabegyntSoknad = dagerFraInnsendtSoknad({
            behandlingskjeder,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe('INGEN_DATA');
    });

    test('den returnerer 0 når nyeste søknad er samme som registreringsdato', () => {
        const behandlingskjeder = [
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2021-03-15T09:31:57.507+01:00' },
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2017-03-13T03:18:00.709+01:00' },
            { status: 'UNDER_BEHANDLING', sistOppdatert: '2021-06-01T13:01:40+01:00' },
            { status: 'UNDER_BEHANDLING', sistOppdatert: '2015-10-23T10:19:21+02:00' },
        ];
        const registreringsDato = new Date('2021-06-01');
        const antallDagerFraPabegyntSoknad = dagerFraInnsendtSoknad({
            behandlingskjeder,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe(0);
    });

    test('den returnerer 1 når nyeste søknad er dagen etter registreringsdato', () => {
        const behandlingskjeder = [
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2021-03-15T09:31:57.507+01:00' },
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2017-03-13T03:18:00.709+01:00' },
            { status: 'UNDER_BEHANDLING', sistOppdatert: '2021-06-02T13:01:40+01:00' },
            { status: 'UNDER_BEHANDLING', sistOppdatert: '2015-10-23T10:19:21+02:00' },
        ];
        const registreringsDato = new Date('2021-06-01');
        const antallDagerFraPabegyntSoknad = dagerFraInnsendtSoknad({
            behandlingskjeder,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe(1);
    });

    test('den returnerer -1 når nyeste søknad er dagen før registreringsdato', () => {
        const behandlingskjeder = [
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2021-03-15T09:31:57.507+01:00' },
            { status: 'FERDIG_BEHANDLET', sistOppdatert: '2017-03-13T03:18:00.709+01:00' },
            { status: 'UNDER_BEHANDLING', sistOppdatert: '2021-05-31T13:01:40+01:00' },
            { status: 'UNDER_BEHANDLING', sistOppdatert: '2015-10-23T10:19:21+02:00' },
        ];
        const registreringsDato = new Date('2021-06-01');
        const antallDagerFraPabegyntSoknad = dagerFraInnsendtSoknad({
            behandlingskjeder,
            registreringsDato,
        });
        expect(antallDagerFraPabegyntSoknad).toBe(-1);
    });
});
