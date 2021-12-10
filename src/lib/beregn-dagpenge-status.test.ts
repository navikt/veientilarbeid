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
                meldekort: [],
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
                meldekort: [],
            })
        ).toBe('ukjent');
    });

    test('returnerer "ukjent" hvis ingen spor etter søknad, vedtak eller meldekort', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: [],
                innsendteSoknader: [],
                dagpengeVedtak: [],
                meldekort: [],
            })
        ).toBe('ukjent');
    });

    test('returnerer "ukjent" når ikke eksisterer påbegynte søknader etter registreringsdato', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [...soknad];

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: soknader,
                innsendteSoknader: [],
                dagpengeVedtak: [],
                meldekort: [],
            })
        ).toBe('ukjent');
    });

    test('returnerer "paabegynt" når det eksisterer påbegynte søknader etter registreringsdato', () => {
        const testData = JSON.parse(JSON.stringify(grunndata));
        const soknader = [...soknad];
        soknader[0].datoInnsendt = plussDager(iDag, 1).toISOString();

        return expect(
            beregnDagpengeStatus({
                ...testData,
                paabegynteSoknader: soknader,
                innsendteSoknader: [],
                dagpengeVedtak: [],
                meldekort: [],
            })
        ).toBe('paabegynt');
    });
});
