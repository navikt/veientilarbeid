import { DinSituasjonSvar, FremtidigSituasjonSvar } from '../contexts/brukerregistrering';
import { plussDager } from '../utils/date-utils';
import { visBesvarelser } from './vis-besvarelse';
import { Formidlingsgruppe, Servicegruppe } from '../contexts/oppfolging';

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
    featuretoggleData: {
        'aia.bruk-endring-av-situasjon': true,
    },
    besvarelseData: null,
    arbeidssokerPeriodeData: {
        harAktivArbeidssokerperiode: 'Ja',
        aktivPeriodeStart: 'INGEN_DATA',
        antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
        antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
        antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
        forrigePeriodeAvsluttetDato: 'INGEN_DATA',
    },
    erStandardInnsats: true,
};

describe('Tester funksjonen visBesvarelser', () => {
    test('Nei hvis AAP', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.rettighetsgruppe = 'AAP';
        expect(visBesvarelser(testdata)).toBe(false);
    });

    test('NEI hvis ikke innefor aldersgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.alder = 60;
        expect(visBesvarelser(testdata)).toBe(false);
    });

    test('NEI hvis bruker kan reaktveres', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.kanReaktiveres = true;
        expect(visBesvarelser(testdata)).toBe(false);
    });

    test('NEI hvis person ikke har standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.erStandardInnsats = false;
        expect(visBesvarelser(testdata)).toBe(false);
    });

    test('NEI hvis person ikke har aktiv arbeidssøkerperiode', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.arbeidssokerPeriodeData.harAktivArbeidssokerperiode = 'Nei';
        expect(visBesvarelser(testdata)).toBe(false);
    });

    test('JA hvis person har besvarelse, er innefor aldersgruppe, har featuretoggle, ikke kan reaktivers og er standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.alder = 45;
        testdata.oppfolgingData.kanReaktiveres = false;
        testdata.oppfolgingData.servicegruppe = 'IKVAL';
        testdata.oppfolgingData.formidlingsgruppe = 'ARBS';
        testdata.besvarelseData = { registreringsId: 1, erBesvarelsenEndret: true };

        expect(visBesvarelser(testdata)).toBe(true);
    });

    test('JA hvis person har besvarelse, har featuretoggle og aktiv arbeidssøkerperiode', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.brukerInfoData.alder = 60;
        testdata.oppfolgingData.servicegruppe = 'BKART';
        testdata.besvarelseData = { registreringsId: 1, erBesvarelsenEndret: true };
        testdata.arbeidssokerPeriodeData.harAktivArbeidssokerperiode = 'Ja';

        expect(visBesvarelser(testdata)).toBe(true);
    });

    test('JA hvis bruker ikke har besvarelse, er innefor aldersgruppe, har featuretoggle, ikke kan reaktivers, er permittert og er standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2023-05-02');
        testdata.registreringData.registrering.besvarelse.dinSituasjon = DinSituasjonSvar.ER_PERMITTERT;
        testdata.brukerInfoData.alder = 45;
        testdata.oppfolgingData.kanReaktiveres = false;
        testdata.oppfolgingData.servicegruppe = 'IKVAL';
        testdata.oppfolgingData.formidlingsgruppe = 'ARBS';
        testdata.besvarelseData = null;

        expect(visBesvarelser(testdata)).toBe(true);
    });

    test('NEI hvis bruker ikke har besvarelse, er innefor aldersgruppe, har featuretoggle, ikke kan reaktivers, er permittert, er standard innsatsgruppe men registrert før release', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2023-01-02');
        testdata.registreringData.registrering.besvarelse.dinSituasjon = DinSituasjonSvar.ER_PERMITTERT;
        testdata.brukerInfoData.alder = 45;
        testdata.oppfolgingData.kanReaktiveres = false;
        testdata.oppfolgingData.servicegruppe = 'IKVAL';
        testdata.oppfolgingData.formidlingsgruppe = 'ARBS';
        testdata.besvarelseData = null;

        expect(visBesvarelser(testdata)).toBe(false);
    });

    test('NEI hvis bruker ikke har besvarelse, er innefor aldersgruppe, har featuretoggle, ikke kan reaktivers, ikke er permittert og er standard innsatsgruppe', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.opprettetDato = new Date('2023-05-02');
        testdata.registreringData.registrering.besvarelse.dinSituasjon = DinSituasjonSvar.MISTET_JOBBEN;
        testdata.brukerInfoData.alder = 45;
        testdata.oppfolgingData.kanReaktiveres = false;
        testdata.oppfolgingData.servicegruppe = 'IKVAL';
        testdata.oppfolgingData.formidlingsgruppe = 'ARBS';
        testdata.besvarelseData = null;

        expect(visBesvarelser(testdata)).toBe(false);
    });
});
