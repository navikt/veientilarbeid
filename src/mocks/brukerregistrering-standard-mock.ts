const brukerregistrering = {
    type: 'ORDINAAER_REGISTRERING',
    registrering: {
        manueltRegistrertAv: null,
        id: 103,
        opprettetDato: new Date().toISOString(),
        besvarelse: {
            utdanning: 'HOYERE_UTDANNING_5_ELLER_MER',
            utdanningBestatt: 'JA',
            utdanningGodkjent: 'JA',
            helseHinder: 'NEI',
            andreForhold: 'NEI',
            sisteStilling: 'INGEN_SVAR',
            dinSituasjon: 'MISTET_JOBBEN',
        },
        profilering: {
            innsatsgruppe: 'STANDARD_INNSATS',
        },
        teksterForBesvarelse: [
            {
                sporsmalId: 'dinSituasjon',
                sporsmal: 'Velg den situasjonen som passer deg best',
                svar: 'Har mistet eller kommer til å miste jobben',
            },
            {
                sporsmalId: 'utdanning',
                sporsmal: 'Hva er din høyeste fullførte utdanning?',
                svar: 'Høyere utdanning (5 år eller mer)',
            },
            {
                sporsmalId: 'utdanningGodkjent',
                sporsmal: 'Er utdanningen din godkjent i Norge?',
                svar: 'Ja',
            },
            { sporsmalId: 'utdanningBestatt', sporsmal: 'Er utdanningen din bestått?', svar: 'Ja' },
            {
                sporsmalId: 'andreForhold',
                sporsmal: 'Har du andre problemer med å søke eller være i jobb?',
                svar: 'Nei',
            },
            {
                sporsmalId: 'sisteStilling',
                sporsmal: '',
                svar: 'Ikke besvart',
            },
            {
                sporsmalId: 'helseHinder',
                sporsmal: 'Har du helseproblemer som hindrer deg i å søke eller være i jobb?',
                svar: 'Nei',
            },
        ],
    },
};

export default brukerregistrering;
