import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';
import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../../ducks/brukerregistrering';
import { InnloggingsNiva } from '../../ducks/autentisering';
import { plussDager } from '../../utils/date-utils';
import { POAGruppe } from '../../utils/get-poa-group';
import { EksperimentId } from '../../eksperiment/eksperimenter';
import { kanVise12UkerEgenvurdering } from './12uker-egenvurdering';

const eksperiment: EksperimentId = 'onboarding14a';
const poagruppeKSS: POAGruppe = 'kss';
const dpVenter: 'nei' = 'nei';

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

describe('Tester funksjonen kanVise12UkerEgenvurdering', () => {
    test('returnerer true om alt er satt korrekt', () => {
        expect(kanVise12UkerEgenvurdering(grunndata)).toBe(true);
    });

    test('returnerer false om man er registrert i uke 0', () => {
        const testData = { ...grunndata, amplitudeData: { ...grunndata.amplitudeData, ukerRegistrert: 0 } };
        expect(kanVise12UkerEgenvurdering(testData)).toBe(false);
    });
});
