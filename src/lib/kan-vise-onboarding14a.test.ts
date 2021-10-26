import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../ducks/brukerregistrering';
import { plussDager } from '../utils/date-utils';
import { kanViseOnboarding14A } from './kan-vise-onboarding14a';
import { Formidlingsgruppe, Servicegruppe } from '../ducks/oppfolging';

const grunndata = {
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
        'veientilarbeid.modal': false,
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': true,
        'veientilarbeid.registrert-permittert': false,
        'veientilarbeid.dagpenger-status': false,
        'veientilarbeid.dpstatus-for-alle': false,
        'veientilarbeid.egenvurderinguke12': true,
        'veientilarbeid.rydding.skjulJobbBoks': false,
        'veientilarbeid.rydding.skjulOkonomiBoks': false,
        'veientilarbeid.rydding.skjulAAPRad': false,
        'veientilarbeid.visbrukerundersokelse': false,
        'veientilarbeid.onboarding14a.situasjonsbestemt': false,
        'veientilarbeid.meldekort-intro.situasjonsbestemt': false,
    },
    sistVistFraLocalstorage: 0,
};

describe('Tester funksjonen kanViseOnboarding14A', () => {
    test('Nei hvis AAP', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.rettighetsgruppe = 'AAP';
        expect(kanViseOnboarding14A(testdata)).toBe(false);
    });

    test('Ja hvis featureToggle og situasjonsbestemt', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.featuretoggleData['veientilarbeid.onboarding14a.situasjonsbestemt'] = true;
        testdata.oppfolgingData.servicegruppe = 'BFORM';
        expect(kanViseOnboarding14A(testdata)).toBe(true);
    });

    test('NEI hvis ikke featureToggle og situasjonsbestemt', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.featuretoggleData['veientilarbeid.onboarding14a.situasjonsbestemt'] = false;
        testdata.oppfolgingData.servicegruppe = 'BFORM';
        expect(kanViseOnboarding14A(testdata)).toBe(false);
    });

    test('NEI hvis ikke bruker kan reaktveres', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.kanReaktiveres = true;
        expect(kanViseOnboarding14A(testdata)).toBe(false);
    });

    test('NEI hvis ikke bruker ikke er standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.servicegruppe = 'BKART';
        expect(kanViseOnboarding14A(testdata)).toBe(false);
    });

    test('JA hvis ikke kan reaktivers og er standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.kanReaktiveres = false;
        testdata.oppfolgingData.servicegruppe = 'IKVAL';
        testdata.oppfolgingData.formidlingsgruppe = 'ARBS';
        expect(kanViseOnboarding14A(testdata)).toBe(true);
    });
});
