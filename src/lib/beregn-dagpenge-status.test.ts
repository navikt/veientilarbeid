import { plussDager } from '../utils/date-utils';
import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../contexts/brukerregistrering';
import beregnDagpengeStatus from './beregn-dagpenge-status';
import soknad from '../mocks/dp-innsyn-soknad';

const iDag = new Date();
const grunndata = {
    brukerInfoData: {
        rettighetsgruppe: 'IYT',
        geografiskTilknytning: '110302',
        alder: 42,
        erSykmeldtMedArbeidsgiver: false,
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

    // test('returnerer "ukjent" når ikke eksisterer påbegynte søknader etter registreringsdato', () => {
    //     const testData = JSON.parse(JSON.stringify(grunndata));
    //     const soknader = [...soknad];

    //     return expect(
    //         beregnDagpengeStatus({
    //             ...testData,
    //             paabegynteSoknader: soknader,
    //             innsendteSoknader: [],
    //             dagpengeVedtak: [],
    //         })
    //     ).toBe('ukjent');
    // });

    // test('returnerer "paabegynt" når det eksisterer påbegynte søknader etter registreringsdato', () => {
    //     const testData = JSON.parse(JSON.stringify(grunndata));
    //     const soknader = [
    //         {
    //             tittel: 'Søknad om dagpenger (ikke permittert)',
    //             lenke: 'https://tjenester-q1.nav.no/soknaddagpenger-innsending/soknad/10010WQX9',
    //             dato: plussDager(iDag, 1).toISOString(),
    //             kilde: 'HENVENDELSE',
    //         },
    //     ];

    //     return expect(
    //         beregnDagpengeStatus({
    //             ...testData,
    //             paabegynteSoknader: soknader,
    //             innsendteSoknader: [],
    //             dagpengeVedtak: [],
    //         })
    //     ).toBe('paabegynt');
    // });

    // test('returnerer "sokt" når det eksisterer innsendte søknader etter registreringsdato og ingen vedtak etter registreringsdato', () => {
    //     const testData = JSON.parse(JSON.stringify(grunndata));
    //     const soknader = [...soknad];
    //     soknader[0].datoInnsendt = plussDager(iDag, 1).toISOString();

    //     return expect(
    //         beregnDagpengeStatus({
    //             ...testData,
    //             paabegynteSoknader: [],
    //             innsendteSoknader: soknader,
    //             dagpengeVedtak: [
    //                 {
    //                     vedtakId: '2',
    //                     fagsakId: 'arenaId',
    //                     status: 'INNVILGET',
    //                     datoFattet: plussDager(iDag, -10).toISOString(),
    //                     fraDato: '2021-11-19T10:31:18.176',
    //                     tilDato: 'null',
    //                 },
    //             ],
    //         })
    //     ).toBe('sokt');
    // });

    // test('returnerer "ukjent" når det eksisterer innsendte søknader før registreringsdato og vedtak etter registreringsdato', () => {
    //     const testData = JSON.parse(JSON.stringify(grunndata));
    //     const soknader = [...soknad];
    //     soknader[0].datoInnsendt = plussDager(iDag, -10).toISOString();

    //     return expect(
    //         beregnDagpengeStatus({
    //             ...testData,
    //             paabegynteSoknader: [],
    //             innsendteSoknader: soknader,
    //             dagpengeVedtak: [
    //                 {
    //                     vedtakId: '2',
    //                     fagsakId: 'arenaId',
    //                     status: 'INNVILGET',
    //                     datoFattet: plussDager(iDag, -10).toISOString(),
    //                     fraDato: '2021-11-19T10:31:18.176',
    //                     tilDato: 'null',
    //                 },
    //             ],
    //         })
    //     ).toBe('ukjent');
    // });

    // test('returnerer "avslag" når det eksisterer avslått vedtak nyere enn registreringsdato og sist innsendte søknad', () => {
    //     const testData = JSON.parse(JSON.stringify(grunndata));
    //     const soknader = [...soknad];
    //     soknader[0].datoInnsendt = plussDager(iDag, 1).toISOString();

    //     return expect(
    //         beregnDagpengeStatus({
    //             ...testData,
    //             paabegynteSoknader: [],
    //             innsendteSoknader: soknader,
    //             dagpengeVedtak: [
    //                 {
    //                     vedtakId: '2',
    //                     fagsakId: 'arenaId',
    //                     status: 'AVSLÅTT',
    //                     datoFattet: plussDager(iDag, 2).toISOString(),
    //                     fraDato: '2021-11-19T10:31:18.176',
    //                     tilDato: 'null',
    //                 },
    //             ],
    //         })
    //     ).toBe('avslag');
    // });
});
