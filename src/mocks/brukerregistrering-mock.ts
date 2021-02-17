export default {
    type: 'SYKMELDT',
    registrering: {
        manueltRegistrertAv: null,
        id: 103,
        opprettetDato: new Date().toISOString(),
        besvarelse: {
            utdanning: 'INGEN_UTDANNING',
            utdanningBestatt: 'INGEN_SVAR',
            utdanningGodkjent: 'INGEN_SVAR',
            helseHinder: 'NEI',
            andreForhold: 'NEI',
            sisteStilling: 'Barne- og ungdomsarbeider i skolefritidsordning',
            dinSituasjon: 'MISTET_JOBBEN',
            fremtidigSituasjon: 'NY_ARBEIDSGIVER',
            tilbakeIArbeid: 'USIKKER',
        },
        profilering: {
            innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
        },
        teksterForBesvarelse: [
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
        ],
    },
};
