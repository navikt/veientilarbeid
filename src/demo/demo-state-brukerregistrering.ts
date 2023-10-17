import { DemoData, hentDemoState, opprettetRegistreringDato, settDemoState } from './demo-state';
import { DinSituasjonSvar, ForeslattInnsatsgruppe, FremtidigSituasjonSvar } from '../hooks/use-brukerregistrering-data';

const defaultFremtidigSituasjon = FremtidigSituasjonSvar.NY_ARBEIDSGIVER;
const defaultDinSituasjon = DinSituasjonSvar.MISTET_JOBBEN;
const defaultBesvarelse = {
    utdanning: 'INGEN_UTDANNING',
    utdanningBestatt: 'INGEN_SVAR',
    utdanningGodkjent: 'INGEN_SVAR',
    helseHinder: 'NEI',
    andreForhold: 'NEI',
    sisteStilling: 'Barne- og ungdomsarbeider i skolefritidsordning',
    dinSituasjon: defaultDinSituasjon,
    fremtidigSituasjon: defaultFremtidigSituasjon,
    tilbakeIArbeid: 'USIKKER',
};
const defaultForeslattInnsatsgruppe = ForeslattInnsatsgruppe.STANDARD_INNSATS;
const defaultOpprettetDato = opprettetRegistreringDato.registrertIDag;
const defaultTeksterForBesvarelse = [
    {
        sporsmalId: 'fremtidigSituasjon',
        sporsmal: 'Hva tenker du om din fremtidige situasjon?',
        svar: 'Jeg trenger ny jobb',
    },
    {
        sporsmalId: 'utdanningBestatt',
        sporsmal: 'Er utdanningen din bestått?',
        svar: 'Ikke aktuelt',
    },
    {
        sporsmalId: 'utdanningGodkjent',
        sporsmal: 'Er utdanningen din godkjent i Norge?',
        svar: 'Ikke aktuelt',
    },
    {
        sporsmalId: 'utdanning',
        sporsmal: 'Hva er din høyeste fullførte utdanning?',
        svar: 'Ingen utdanning',
    },
    {
        sporsmalId: 'andreForhold',
        sporsmal: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
        svar: 'Nei',
    },
];

export const hentBrukerRegistrering = () => ({
    registrering: {
        opprettetDato: hentOpprettetDato(),
        besvarelse: {
            ...defaultBesvarelse,
            dinSituasjon: hentDinSituasjon(),
            fremtidigSituasjon: hentFremtidigSituasjon(),
        },
        profilering: {
            innsatsgruppe: hentForeslattInnsatsgruppe(),
        },
        teksterForBesvarelse: defaultTeksterForBesvarelse,
        manueltRegistrertAv: null,
    },
});

export const hentFremtidigSituasjon = () => hentDemoState(DemoData.FREMTIDIG_SITUASJON) || defaultFremtidigSituasjon;
export const settFremtidigSituasjon = (fremtidigSituasjon: FremtidigSituasjonSvar) =>
    settDemoState(DemoData.FREMTIDIG_SITUASJON, fremtidigSituasjon);

export const hentDinSituasjon = () => hentDemoState(DemoData.DIN_SITUASJON) || defaultDinSituasjon;
export const settDinSituasjon = (dinSituasjon: DinSituasjonSvar) => settDemoState(DemoData.DIN_SITUASJON, dinSituasjon);

export const hentForeslattInnsatsgruppe = () =>
    hentDemoState(DemoData.FORESLATT_INNSATSGRUPPE) || defaultForeslattInnsatsgruppe;
export const settForeslattInnsatsgruppe = (innsatsgruppe: ForeslattInnsatsgruppe) =>
    settDemoState(DemoData.FORESLATT_INNSATSGRUPPE, innsatsgruppe);

export const hentOpprettetDato = () => hentDemoState(DemoData.REGISTRERING_OPPRETTET) || defaultOpprettetDato;
export const settOpprettetDato = (opprettetDato: string) =>
    settDemoState(DemoData.REGISTRERING_OPPRETTET, opprettetDato);
