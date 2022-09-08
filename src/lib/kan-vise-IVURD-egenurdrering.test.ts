import { ForeslattInnsatsgruppe } from '../contexts/brukerregistrering';
import { InnloggingsNiva } from '../contexts/autentisering';
import { kanViseIVURDEgenvurdering } from './kan-vise-IVURD-egenvurdering';
import { Formidlingsgruppe, Servicegruppe } from '../contexts/oppfolging';

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
        servicegruppe: Servicegruppe.IVURD,
    },
    registreringData: {
        registrering: {
            opprettetDato: '2020-01-01',
            profilering: { innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS },
            besvarelse: null,
        },
    },
    autentiseringData: {
        securityLevel: InnloggingsNiva.LEVEL_4,
        loggedIn: true,
    },
    underOppfolging: true,
};

describe('Tester funksjonen kanViseIVURDEgenvurdering', () => {
    test('NEI når brukerregistrering ikke finnes', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering = null;
        expect(kanViseIVURDEgenvurdering(testdata)).toBe(false);
    });

    test('NEI hvis svart at er permitert', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.besvarelse = { dinSituasjon: 'ER_PERMITTERT' };
        expect(kanViseIVURDEgenvurdering(testdata)).toBe(false);
    });

    test('Nei hvis bruker IKKE er vurdert IVURD', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.servicegruppe = Servicegruppe.BFORM;
        expect(kanViseIVURDEgenvurdering(testdata)).toBe(false);
    });

    test('Nei hvis bruker IKKE er under oppfølging', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.underOppfolging = false;
        expect(kanViseIVURDEgenvurdering(testdata)).toBe(false);
    });

    test('Nei hvis bruker har reservert seg fra KRR', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.reservasjonKRR = true;
        expect(kanViseIVURDEgenvurdering(testdata)).toBe(false);
    });

    test('Nei hvis bruker IKKE er foreslatt innsatsgruppe standard eller situasjonsbestemt eller undefind', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.profilering.innsatsgruppe =
            ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING;
        expect(kanViseIVURDEgenvurdering(testdata)).toBe(false);
    });

    test('Ja hvis bruker er foreslatt innsatsgruppe situasjonsbestemt', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.profilering.innsatsgruppe =
            ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS;
        expect(kanViseIVURDEgenvurdering(testdata)).toBe(true);
    });
});
