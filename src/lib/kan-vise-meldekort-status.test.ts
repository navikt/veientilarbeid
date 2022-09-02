import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../contexts/brukerregistrering';
import { InnloggingsNiva } from '../contexts/autentisering';
import { plussDager } from '../utils/date-utils';
import { kanViseMeldekortStatus } from './kan-vise-meldekort-status';
import { Formidlingsgruppe, Servicegruppe } from '../contexts/oppfolging';
import { EksperimentId } from '../eksperiment/eksperimenter';

const eksperiment: EksperimentId = 'onboarding14a';
// const poagruppeKSS: POAGruppe = 'kss';
// const dpVenter: 'nei' = 'nei';

// meldekortData: Meldekort.Data | null;
//     brukerInfoData: BrukerInfo.Data;
//     oppfolgingData: Oppfolging.Data;
//     registreringData: Brukerregistrering.Data | null;

const grunndata = {
    meldekortData: {
        meldekort: [],
    },
    brukerInfoData: {
        rettighetsgruppe: 'DAGP',
        geografiskTilknytning: '110302',
        alder: 42,
        erSykmeldtMedArbeidsgiver: false,
    },
    oppfolgingData: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
        kanReaktiveres: false,
        reservasjonKRR: false,
    },
    registreringData: {
        registrering: {
            opprettetDato: plussDager(new Date(), -78).toISOString(),
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
    egenvurderingData: {
        sistOppdatert: plussDager(new Date(), -78).toISOString(),
    },
    featuretoggleData: {
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': true,
        'veientilarbeid.egenvurderinguke12': true,
    },
    amplitudeData: {
        geografiskTilknytning: 'INGEN_VERDI',
        isKSSX: 'nei',
        isKSSK: 'nei',
        erSamarbeidskontor: 'nei',
        ukerRegistrert: 11,
        dagerRegistrert: 78,
        nivaa: InnloggingsNiva.LEVEL_4,
        kanReaktiveres: 'nei',
        formidlingsgruppe: 'INGEN_VERDI',
        servicegruppe: 'IVURD',
        rettighetsgruppe: 'INGEN_VERDI',
        meldegruppe: 'INGEN_VERDI',
        registreringType: 'INGEN_VERDI',
        underOppfolging: 'nei',
        antallDagerEtterFastsattMeldingsdag: 'ikke meldekortbruker',
        antallMeldekortKlareForLevering: 0,
        gitVersion: 'INGEN_VERDI',
        buildTimestamp: new Date().toISOString(),
        antallSynligeInfomeldinger: 0,
        erSykmeldtMedArbeidsgiver: 'ukjent',
        dinSituasjon: DinSituasjonSvar.INGEN_VERDI,
        reservasjonKRR: 'ukjent',
        eksperimenter: [eksperiment],
        dagpengerVedleggEttersendes: 0,
        dagpengerSoknadMellomlagret: 0,
        dagpengerDagerMellomPaabegyntSoknadOgRegistrering: 0,
        dagpengerDagerMellomInnsendtSoknadOgRegistrering: 0,
        dagpengerStatusBeregning: 'INGEN_DATA',
    },
    sistVistFraLocalstorage: 0,
};

describe('Tester funksjonen kanViseMeldekortStatus', () => {
    test('NEI hvis ikke har meldekort', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.meldekortData.meldekort = [];
        expect(kanViseMeldekortStatus(testdata)).toBe(false);
    });

    test('Nei hvis AAP', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.rettighetsgruppe = 'AAP';
        expect(kanViseMeldekortStatus(testdata)).toBe(false);
    });

    test('NEI hvis ikke bruker Ikke har dagpenger eller arbeidssoker meldekort', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.meldekortData.meldekort = [{ meldegruppe: 'DAGP' }];
        expect(kanViseMeldekortStatus(testdata)).toBe(true);
        testdata.meldekortData.meldekort = [{ meldegruppe: 'ARBS' }];
        expect(kanViseMeldekortStatus(testdata)).toBe(true);
        testdata.meldekortData.meldekort = [{ meldegruppe: 'INGEN_VERDI' }];
        expect(kanViseMeldekortStatus(testdata)).toBe(false);
    });

    test('NEI hvis ikke bruker ikke er standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.servicegruppe = 'BKART';
        expect(kanViseMeldekortStatus(testdata)).toBe(false);
    });

    test('JA hvis bruker er situasjonsbestemt innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.meldekortData.meldekort = [{ meldegruppe: 'ARBS' }];
        testdata.oppfolgingData.servicegruppe = 'BFORM';
        expect(kanViseMeldekortStatus(testdata)).toBe(true);
    });

    test('JA hvis har meldekort, ikke "AAP", "DAGP" eller "ARBS", er standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.meldekortData.meldekort = [{ meldegruppe: 'DAGP' }];
        testdata.brukerInfoData.rettighetsgruppe = 'DAGP';

        expect(kanViseMeldekortStatus(testdata)).toBe(true);
    });
});
