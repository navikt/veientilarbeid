import { FremtidigSituasjonSvar } from '../contexts/brukerregistrering';
import { Servicegruppe, Formidlingsgruppe } from '../contexts/oppfolging';
import { erSannsynligvisInaktivertStandardbruker } from './er-sannsyligvis-inaktivert-standard-innsatsgruppe';

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
        kanReaktiveres: true,
        reservasjonKRR: false,
        servicegruppe: Servicegruppe.IKVAL,
        formidlingsgruppe: Formidlingsgruppe.ISERV,
    },
};

describe('tester funksjonaliteten for erStandardInnsatsgruppe', () => {
    test('returnerer true for ARBS + ISERV + kan reaktiveres', () => {
        const testData = { ...grunnData };
        expect(erSannsynligvisInaktivertStandardbruker(testData)).toBe(true);
    });

    test('returnerer false for ARBS + ISERV og ikke kan reaktiveres', () => {
        const testData = { ...grunnData, oppfolgingData: { ...grunnData.oppfolgingData, kanReaktiveres: false } };
        expect(erSannsynligvisInaktivertStandardbruker(testData)).toBe(false);
    });
});
