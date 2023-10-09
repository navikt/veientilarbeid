import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';
import { FremtidigSituasjonSvar } from '../hooks/use-brukerregistrering-data';
import { Formidlingsgruppe, Servicegruppe } from '../hooks/use-oppfolging-data';

const grunnData = {
    brukerregistreringData: {
        opprettetDato: new Date().toISOString(),
        manueltRegistrertAv: null,
        besvarelse: {
            dinSituasjon: null,
            fremtidigSituasjon: FremtidigSituasjonSvar.USIKKER,
            sisteStilling: null,
            tilbakeIArbeid: null,
            andreForhold: null,
            helseHinder: null,
            utdanning: null,
            utdanningBestatt: null,
            utdanningGodkjent: null,
            teksterForBesvarelse: null,
        },
        teksterForBesvarelse: null,
    },
    oppfolgingData: {
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: Servicegruppe.BFORM,
        formidlingsgruppe: Formidlingsgruppe.ARBS,
    },
};

describe('tester funksjonaliteten for sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe', () => {
    test('returnerer true for ARBS + BFORM', () => {
        const testData = { ...grunnData };
        expect(sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe(testData)).toBe(true);
    });

    test('returnerer true for ARBS + IVURD og profilering lik SITUASJONSBESTEMT_INNSATS', () => {
        const lokaleData = {
            brukerregistreringData: {
                opprettetDato: new Date().toISOString(),
                manueltRegistrertAv: null,
                besvarelse: {
                    dinSituasjon: null,
                    fremtidigSituasjon: FremtidigSituasjonSvar.USIKKER,
                    sisteStilling: null,
                    tilbakeIArbeid: null,
                    andreForhold: null,
                    helseHinder: null,
                    utdanning: null,
                    utdanningBestatt: null,
                    utdanningGodkjent: null,
                    teksterForBesvarelse: null,
                },
                teksterForBesvarelse: null,
                profilering: {
                    innsatsgruppe: ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS,
                },
            },
            oppfolgingData: {
                kanReaktiveres: false,
                reservasjonKRR: false,
                servicegruppe: Servicegruppe.IVURD,
                formidlingsgruppe: Formidlingsgruppe.ARBS,
            },
        };
        const testData = { ...grunnData, ...lokaleData };
        expect(sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe(testData)).toBe(true);
    });

    test('returnerer false for ARBS + IVURD og profilering lik BEHOV_FOR_ARBEIDSEVNEVURDERING', () => {
        const lokaleData = {
            brukerregistreringData: {
                opprettetDato: new Date().toISOString(),
                manueltRegistrertAv: null,
                besvarelse: {
                    dinSituasjon: null,
                    fremtidigSituasjon: FremtidigSituasjonSvar.USIKKER,
                    sisteStilling: null,
                    tilbakeIArbeid: null,
                    andreForhold: null,
                    helseHinder: null,
                    utdanning: null,
                    utdanningBestatt: null,
                    utdanningGodkjent: null,
                    teksterForBesvarelse: null,
                },
                teksterForBesvarelse: null,
                profilering: {
                    innsatsgruppe: ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING,
                },
            },
            oppfolgingData: {
                kanReaktiveres: false,
                reservasjonKRR: false,
                servicegruppe: Servicegruppe.IVURD,
                formidlingsgruppe: Formidlingsgruppe.ARBS,
            },
        };
        const testData = { ...grunnData, ...lokaleData };
        expect(sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe(testData)).toBe(false);
    });

    test('returnerer false for ARBS + IVURD og ingen profilering', () => {
        const lokaleData = {
            oppfolgingData: {
                kanReaktiveres: false,
                reservasjonKRR: false,
                servicegruppe: Servicegruppe.IVURD,
                formidlingsgruppe: Formidlingsgruppe.ARBS,
            },
        };
        const testData = { ...grunnData, ...lokaleData };
        expect(sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe(testData)).toBe(false);
    });
});
