import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../contexts/brukerregistrering';
import beregnDagpengeStatus from './beregn-dagpenge-status';
import { plussDager } from '../utils/date-utils';
import soknad from '../mocks/dp-innsyn-soknad';

const iDag = new Date();
const grunndata = {
    brukerInfoData: {
        rettighetsgruppe: 'IYT',
        geografiskTilknytning: '110302',
        alder: 42,
        erSykmeldtMedArbeidsgiver: false,
    },
    arbeidssokerperioder: {
        harAktivArbeidssokerperiode: 'INGEN_DATA',
        aktivPeriodeStart: 'INGEN_DATA',
        antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
        antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
        antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
    },
    registreringData: {
        registrering: {
            opprettetDato: iDag.toISOString(),
            manueltRegistrertAv: null,
            besvarelse: {
                dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
                fremtidigSituasjon: FremtidigSituasjonSvar.INGEN_PASSER,
                sisteStilling: '',
                tilbakeIArbeid: '',
                andreForhold: '',
                helseHinder: '',
                utdanning: '',
                utdanningBestatt: '',
                utdanningGodkjent: '',
            },
            teksterForBesvarelse: [],
        },
    },
};

describe('Tester funksjonen beregnDagpengeStatus', () => {
    test('returnerer "mottar" når bruker mottar dagpenger', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        testData.brukerInfoData.rettighetsgruppe = 'DAGP';

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: [],
                dagpengeVedtak: [],
            })
        ).toBe('mottar');
    });

    test('returnerer "ukjent" hvis ingen registreringsdato', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        delete testData.registreringData.registrering.opprettetDato;

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: [],
                dagpengeVedtak: [],
            })
        ).toBe('ukjent');
    });

    test('returnerer "ukjent" når ikke eksisterer påbegynte søknader, innsendte søknader eller vedtak', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: [],
                dagpengeVedtak: [],
            })
        ).toBe('ukjent');
    });

    test('returnerer "avslag" når vedtak etter nyeste søknad og vedtaket har status "AVSLÅTT" ', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [...soknad];
        soknader[0].datoInnsendt = plussDager(iDag, 10).toISOString();

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: soknader,
                dagpengeVedtak: [
                    {
                        vedtakId: '2',
                        fagsakId: 'arenaId',
                        status: 'AVSLÅTT',
                        datoFattet: plussDager(iDag, 11).toISOString(),
                        fraDato: '2021-11-19T10:31:18.176',
                        tilDato: null,
                    },
                ],
            })
        ).toBe('avslag');
    });

    test('returnerer "innvilget" når vedtak etter nyeste søknad og vedtaket har status "INNVILGET" ', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [...soknad];
        soknader[0].datoInnsendt = plussDager(iDag, 10).toISOString();

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: soknader,
                dagpengeVedtak: [
                    {
                        vedtakId: '2',
                        fagsakId: 'arenaId',
                        status: 'INNVILGET',
                        datoFattet: plussDager(iDag, 11).toISOString(),
                        fraDato: '2021-11-19T10:31:18.176',
                        tilDato: null,
                    },
                ],
            })
        ).toBe('innvilget');
    });

    test('returnerer "tidligere-innvilget" når vedtak etter nyeste søknad og vedtaket har status "INNVILGET" og nyregistrert ', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [...soknad];
        soknader[0].datoInnsendt = plussDager(iDag, 10).toISOString();
        testData.registreringData.registrering.opprettetDato = plussDager(iDag, 12).toISOString();

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: soknader,
                dagpengeVedtak: [
                    {
                        vedtakId: '2',
                        fagsakId: 'arenaId',
                        status: 'INNVILGET',
                        datoFattet: plussDager(iDag, 11).toISOString(),
                        fraDato: '2021-11-19T10:31:18.176',
                        tilDato: null,
                    },
                ],
            })
        ).toBe('tidligere-innvilget');
    });

    test('returnerer "stanset" når vedtakets tilDato har vært', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [...soknad];
        soknader[0].datoInnsendt = plussDager(iDag, 10).toISOString();

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: soknader,
                dagpengeVedtak: [
                    {
                        vedtakId: '2',
                        fagsakId: 'arenaId',
                        status: 'INNVILGET',
                        datoFattet: plussDager(iDag, 11).toISOString(),
                        fraDato: '2021-11-19T10:31:18.176',
                        tilDato: plussDager(iDag, -1).toISOString(),
                    },
                ],
            })
        ).toBe('stanset');
    });

    test('returnerer "paabegynt" når det eksisterer påbegynte søknader', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                behandlingsId: '10010WQX9',
                sistEndret: plussDager(iDag, 1).toISOString(),
            },
        ];

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: soknader,
                innsendteSoknader: [],
                dagpengeVedtak: [],
            })
        ).toBe('paabegynt');
    });

    test('returnerer "sokt" når det eksisterer innsendte søknader og ingen vedtak etter søknadsdato', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [...soknad];
        soknader[0].datoInnsendt = plussDager(iDag, 1).toISOString();

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: soknader,
                dagpengeVedtak: [
                    {
                        vedtakId: '2',
                        fagsakId: 'arenaId',
                        status: 'INNVILGET',
                        datoFattet: plussDager(iDag, -10).toISOString(),
                        fraDato: '2021-11-19T10:31:18.176',
                        tilDato: 'null',
                    },
                ],
            })
        ).toBe('sokt');
    });

    test('returnerer "soktogpaabegynt" når siste påbeynte soknad er nyere enn siste innsendte søknad ', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [...soknad];
        soknader[0].datoInnsendt = plussDager(iDag, 1).toISOString();
        const paabegyntSoknad = [
            {
                tittel: 'Søknad om dagpenger (ikke permittert)',
                behandlingsId: '10010WQX9',
                sistEndret: plussDager(iDag, 2).toISOString(),
            },
        ];

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: paabegyntSoknad,
                innsendteSoknader: soknader,
                dagpengeVedtak: [],
            })
        ).toBe('soktogpaabegynt');
    });
});
