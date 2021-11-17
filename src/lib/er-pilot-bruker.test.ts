import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../contexts/brukerregistrering';
import { plussDager } from '../utils/date-utils';
import { InnloggingsNiva } from '../contexts/autentisering';
import { erPilotBruker } from './er-pilot-bruker';
import { Formidlingsgruppe, Servicegruppe } from '../contexts/oppfolging';
import { EksperimentId } from '../eksperiment/eksperimenter';
import { POAGruppe } from '../utils/get-poa-group';

const eksperiment: EksperimentId = 'onboarding14a';
const dpVenter: 'nei' = 'nei';
const poagruppeKSS: POAGruppe = 'kss';

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
        'veientilarbeid.onboardingMeldekort.situasjonsbestemt': false,
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
        eksperimenter: [eksperiment],
        dagpengerVedleggEttersendes: 0,
        dagpengerSoknadMellomlagret: 0,
        dagpengerSoknadVenterPaSvar: dpVenter,
        dagpengerDagerMellomPaabegyntSoknadOgRegistrering: 0,
        dagpengerDagerMellomInnsendtSoknadOgRegistrering: 0,
        dagpengerStatusBeregning: 'INGEN_DATA',
    },
    sistVistFraLocalstorage: 0,
};

describe('Tester funksjonen er-pilot-bruker', () => {
    test('Nei hvis AAP', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.rettighetsgruppe = 'AAP';
        expect(erPilotBruker(testdata)).toBe(false);
    });

    test('NEI hvis ikke eksperiment', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.amplitudeData.eksperimenter = [];
        expect(erPilotBruker(testdata)).toBe(false);
    });

    test('NEI hvis ikke bruker kan reaktveres', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.kanReaktiveres = true;
        expect(erPilotBruker(testdata)).toBe(false);
    });

    test('JA hvis bruker ikke er AAP, skal se eksperiment og ikke kan reaktivers', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.amplitudeData.eksperimenter = [eksperiment];
        testdata.oppfolgingData.kanReaktiveres = false;
        expect(erPilotBruker(testdata)).toBe(true);
    });
});
