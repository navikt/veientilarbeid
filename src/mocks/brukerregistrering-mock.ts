export default {
    type: 'SYKMELDT',
    registrering: {
        manueltRegistrertAv: null,
        id: 103,
        opprettetDato: '2019-03-14T11:53:05.486686+01:00',
        besvarelse: {
            utdanning: 'INGEN_UTDANNING',
            utdanningBestatt: 'INGEN_SVAR',
            utdanningGodkjent: 'INGEN_SVAR',
            helseHinder: null,
            andreForhold: 'NEI',
            sisteStilling: null,
            dinSituasjon: null,
            fremtidigSituasjon: 'NY_ARBEIDSGIVER',
            tilbakeIArbeid: null
        },
        teksterForBesvarelse: [
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
        ],
        profilering: {
            jobbetSammenhengendeSeksAvTolvSisteManeder: true,
            alder: 40,
            innsatsgruppe: 'STANDARD_INNSATS'
        }
    }
};
