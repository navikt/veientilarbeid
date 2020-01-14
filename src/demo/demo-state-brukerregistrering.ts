import { Besvarelse, ForeslattInnsatsgruppe, FremtidigSituasjonSvar, Profilering } from '../ducks/brukerregistrering';
import { DemoData, hentFraLocalStorage, settILocalStorage } from './demo-state';
import { opprettetRegistreringDato } from './demo-dashboard';

const defaultFremtidigSituasjon = FremtidigSituasjonSvar.NY_ARBEIDSGIVER;
const defaultBesvarelse = {
    utdanning: 'INGEN_UTDANNING',
    utdanningBestatt: 'INGEN_SVAR',
    utdanningGodkjent: 'INGEN_SVAR',
    helseHinder: 'NEI',
    andreForhold: 'NEI',
    sisteStilling: 'Barne- og ungdomsarbeider i skolefritidsordning',
    dinSituasjon: 'MISTET_JOBBEN',
    fremtidigSituasjon: FremtidigSituasjonSvar.NY_ARBEIDSGIVER,
    tilbakeIArbeid: 'USIKKER'
};
const defaultForeslattInnsatsgruppe = ForeslattInnsatsgruppe.STANDARD_INNSATS;
const defaultOpprettetDato = opprettetRegistreringDato.registrertEtterLanseringMotestotte;
const defaultTeksterForBesvarelse = [
    {
        sporsmalId: 'fremtidigSituasjon',
        sporsmal: 'Hva tenker du om din fremtidige situasjon?',
        svar: 'Jeg trenger ny jobb'
    },
    {
        sporsmalId: 'utdanningBestatt',
        sporsmal: 'Er utdanningen din bestått?',
        svar: 'Ikke aktuelt'
    },
    {
        sporsmalId: 'utdanningGodkjent',
        sporsmal: 'Er utdanningen din godkjent i Norge?',
        svar: 'Ikke aktuelt'
    },
    {
        sporsmalId: 'utdanning',
        sporsmal: 'Hva er din høyeste fullførte utdanning?',
        svar: 'Ingen utdanning'
    },
    {
        sporsmalId: 'andreForhold',
        sporsmal: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
        svar: 'Nei'
    }
];


const settRegistrering = (besvarelse?: Besvarelse, profilering?: Profilering, opprettetDato?: string) => {
    const data = {
        registrering: {
            opprettetDato: opprettetDato || hentOpprettetDato(),
            manueltRegistrertAv: null,
            besvarelse: besvarelse || defaultBesvarelse,
            profilering: profilering || {innsatsgruppe: hentForeslattInnsatsgruppe()},
            teksterForBesvarelse: defaultTeksterForBesvarelse,
        }
    };

    settILocalStorage(DemoData.BRUKER_REGISTRERING, JSON.stringify(data));
};

export const settFremtidigSituasjon = (fremtidigSituasjon: FremtidigSituasjonSvar) => {
    settRegistrering(
        Object.assign({}, defaultBesvarelse, { fremtidigSituasjon }),
        undefined,
    );
};

export const settForeslattInnsatsgruppe = (innsatsgruppe: ForeslattInnsatsgruppe) => {
    settRegistrering(
        undefined,
        {
            innsatsgruppe: innsatsgruppe,
        }
    );
};

export const settOpprettetDato = (opprettetDato: string) => {
    settRegistrering(
        undefined,
        undefined,
        opprettetDato,
    );
};

export const hentBrukerRegistreringData = () => {
    const data = hentFraLocalStorage(DemoData.BRUKER_REGISTRERING);

    return data ? JSON.parse(data) : {
        registrering: {
            opprettetDato: defaultOpprettetDato,
            besvarelse: defaultBesvarelse,
            profilering: {
                innsatsgruppe: defaultForeslattInnsatsgruppe,
            },
            teksterForBesvarelse: defaultTeksterForBesvarelse,
            manueltRegistrertAv: null,
        }
    };
};

export const hentFremtidigSituasjon = (): string => {
    const data = hentBrukerRegistreringData();

    if (data.registrering && data.registrering.besvarelse && data.registrering.besvarelse.fremtidigSituasjon) {
        return data.registrering.besvarelse.fremtidigSituasjon;
    }

    return defaultFremtidigSituasjon;
};

export const hentForeslattInnsatsgruppe = (): string => {
    const data = hentBrukerRegistreringData();

    if (data.registrering && data.registrering.profilering && data.registrering.profilering.innsatsgruppe) {
        return data.registrering.profilering.innsatsgruppe;
    }

    return defaultForeslattInnsatsgruppe;
};

export const hentOpprettetDato = (): string => {
    const data = hentBrukerRegistreringData();

    if (data.registrering && data.registrering.opprettetDato) {
        return data.registrering.opprettetDato;
    }

    return defaultOpprettetDato;
};