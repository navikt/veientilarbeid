import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../contexts/brukerregistrering';
import { plussDager } from '../utils/date-utils';
import { kanViseOnboardingDagpenger } from './kan-vise-onboarding-dagpenger';
import { Formidlingsgruppe, Servicegruppe } from '../contexts/oppfolging';
import { POAGruppe } from '../utils/get-poa-group';
import { InnloggingsNiva } from '../contexts/autentisering';

const poagruppeKSS: POAGruppe = 'kss';
const dpVenter: 'nei' = 'nei';

const grunndata = {
    brukerInfoData: {
        rettighetsgruppe: 'DAGP',
        geografiskTilknytning: '3811',
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
    amplitudeData: {
        gruppe: poagruppeKSS,
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
        eksperimenter: [],
        dagpengerVedleggEttersendes: 0,
        dagpengerSoknadMellomlagret: 0,
        dagpengerSoknadVenterPaSvar: dpVenter,
        dagpengerDagerMellomPaabegyntSoknadOgRegistrering: 0,
        dagpengerDagerMellomInnsendtSoknadOgRegistrering: 0,
        dagpengerStatusBeregning: 'INGEN_DATA',
    },
    featuretoggleData: {
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': true,
        'veientilarbeid.dagpenger-status': false,
        'veientilarbeid.dpstatus-for-alle': false,
        'veientilarbeid.egenvurderinguke12': true,
        'veientilarbeid.rydding.skjulJobbBoks': false,
        'veientilarbeid.rydding.skjulOkonomiBoks': false,
        'veientilarbeid.rydding.skjulAAPRad': false,
        'veientilarbeid.onboarding14a.situasjonsbestemt': false,
        'veientilarbeid.onboardingDagpenger': true,
        'veientilarbeid.onboardingDagpenger.toggle': false,
        'veientilarbeid.onboardingMeldekort.situasjonsbestemt': false,
    },
    sistVistFraLocalstorage: 0,
};

describe('Tester funksjonen ytelser-onboarding', () => {
    test('Nei hvis AAP', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.rettighetsgruppe = 'AAP';
        expect(kanViseOnboardingDagpenger(testdata)).toBe(false);
    });

    test('Ja hvis featuretoggle og standard', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.servicegruppe = 'IKVAL';
        testdata.oppfolgingData.formidlingsgruppe = 'ARBS';
        expect(kanViseOnboardingDagpenger(testdata)).toBe(true);
    });

    test('NEI hvis situasjonsbestemt', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.servicegruppe = 'BFORM';
        expect(kanViseOnboardingDagpenger(testdata)).toBe(false);
    });

    test('NEI hvis bruker kan reaktveres', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.kanReaktiveres = true;
        expect(kanViseOnboardingDagpenger(testdata)).toBe(false);
    });

    test('NEI hvis ikke bruker ikke er standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.servicegruppe = 'BKART';
        expect(kanViseOnboardingDagpenger(testdata)).toBe(false);
    });

    test('NEI hvis ikke kan reaktivers og er standard innsatsgruppe uten featuretoggle', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.featuretoggleData['veientilarbeid.onboardingDagpenger'] = false;
        testdata.oppfolgingData.kanReaktiveres = false;
        testdata.oppfolgingData.servicegruppe = 'IKVAL';
        testdata.oppfolgingData.formidlingsgruppe = 'ARBS';
        expect(kanViseOnboardingDagpenger(testdata)).toBe(false);
    });
});
