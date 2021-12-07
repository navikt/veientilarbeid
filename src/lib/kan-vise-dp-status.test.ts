import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../contexts/brukerregistrering';
import { plussDager } from '../utils/date-utils';
import kanViseDpStatus from './kan-vise-dp-status';
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
        'veientilarbeid.visbrukerundersokelse': false,
        'veientilarbeid.onboarding14a.situasjonsbestemt': false,
        'veientilarbeid.onboardingYtelser.situasjonsbestemt': false,
        'veientilarbeid.onboardingDagpenger': true,
        'veientilarbeid.onboardingDagpenger.toggle': false,
        'veientilarbeid.onboardingMeldekort.situasjonsbestemt': false,
    },
    sistVistFraLocalstorage: 0,
};

describe('Tester funksjonen kan-vise-dp-status', () => {
    test('FALSE hvis AAP', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.rettighetsgruppe = 'AAP';
        expect(kanViseDpStatus(testdata)).toBe(false);
    });

    test('TRUE hvis KSS med toggle og innenfor dato', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2021-06-01').toISOString();
        testdata.brukerInfoData.geografiskTilknytning = '110302';
        testdata.amplitudeData.meldegruppe = 'ARBS';
        testdata.amplitudeData.eksperimenter = ['onboarding14a'];
        testdata.featuretoggleData['veientilarbeid.dagpenger-status'] = true;
        expect(kanViseDpStatus(testdata)).toBe(true);
    });

    test('FALSE hvis KSS uten toggle og innenfor dato', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2021-06-01').toISOString();
        testdata.brukerInfoData.geografiskTilknytning = '110302';
        testdata.amplitudeData.meldegruppe = 'ARBS';
        testdata.amplitudeData.eksperimenter = ['onboarding14a'];
        testdata.featuretoggleData['veientilarbeid.dagpenger-status'] = false;
        expect(kanViseDpStatus(testdata)).toBe(false);
    });

    test('FALSE hvis KSS med toggle og utenfor dato', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2021-12-07').toISOString();
        testdata.brukerInfoData.geografiskTilknytning = '110302';
        testdata.amplitudeData.meldegruppe = 'ARBS';
        testdata.amplitudeData.eksperimenter = ['onboarding14a'];
        testdata.featuretoggleData['veientilarbeid.dagpenger-status'] = true;
        expect(kanViseDpStatus(testdata)).toBe(false);
    });

    test('TRUE hvis Standard med toggle og innenfor dato', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2021-06-01').toISOString();
        testdata.brukerInfoData.geografiskTilknytning = '3811';
        testdata.amplitudeData.meldegruppe = 'ARBS';
        testdata.featuretoggleData['veientilarbeid.dpstatus-for-alle'] = true;
        expect(kanViseDpStatus(testdata)).toBe(true);
    });

    test('FALSE hvis Standard uten toggle og innenfor dato', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2021-06-01').toISOString();
        testdata.brukerInfoData.geografiskTilknytning = '3811';
        testdata.amplitudeData.meldegruppe = 'ARBS';
        testdata.featuretoggleData['veientilarbeid.dpstatus-for-alle'] = false;
        expect(kanViseDpStatus(testdata)).toBe(false);
    });

    test('FALSE hvis Standard med toggle og utenfor dato', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2021-06-27').toISOString();
        testdata.brukerInfoData.geografiskTilknytning = '3811';
        testdata.amplitudeData.meldegruppe = 'ARBS';
        testdata.featuretoggleData['veientilarbeid.dpstatus-for-alle'] = true;
        expect(kanViseDpStatus(testdata)).toBe(false);
    });
});
