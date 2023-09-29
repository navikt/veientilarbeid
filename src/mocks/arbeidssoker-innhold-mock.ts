const arbeidssokerInnholdMock = {
    oppfolging: {
        status: 200,
        data: {
            fnr: '12887897709',
            aktorId: '2528667611905',
            veilederId: null,
            reservasjonKRR: false,
            kanVarsles: false,
            manuell: false,
            underOppfolging: true,
            underKvp: false,
            oppfolgingUtgang: null,
            kanStarteOppfolging: false,
            avslutningStatus: null,
            oppfolgingsPerioder: [
                {
                    uuid: '93644cf2-94ba-44d3-a915-defb09b1dd28',
                    aktorId: null,
                    veileder: null,
                    startDato: '2023-08-31T10:32:40.046371+02:00',
                    sluttDato: null,
                    begrunnelse: null,
                    kvpPerioder: [],
                },
            ],
            harSkriveTilgang: true,
            inaktivIArena: null,
            kanReaktiveres: null,
            inaktiveringsdato: null,
            erSykmeldtMedArbeidsgiver: null,
            servicegruppe: null,
            formidlingsgruppe: null,
            rettighetsgruppe: null,
            erIkkeArbeidssokerUtenOppfolging: null,
        },
    },
    brukerregistrering: {
        status: 200,
        data: {
            registrering: {
                id: 10004840,
                opprettetDato: '2023-08-31T10:32:38.230169+02:00',
                besvarelse: {
                    utdanning: 'HOYERE_UTDANNING_1_TIL_4',
                    utdanningBestatt: 'JA',
                    utdanningGodkjent: 'JA',
                    helseHinder: 'NEI',
                    andreForhold: 'NEI',
                    sisteStilling: 'INGEN_SVAR',
                    dinSituasjon: 'MISTET_JOBBEN',
                    fremtidigSituasjon: null,
                    tilbakeIArbeid: null,
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
                        svar: 'Høyere utdanning (1 til 4 år)',
                    },
                    {
                        sporsmalId: 'utdanningGodkjent',
                        sporsmal: 'Er utdanningen din godkjent i Norge?',
                        svar: 'Ja',
                    },
                    {
                        sporsmalId: 'utdanningBestatt',
                        sporsmal: 'Er utdanningen din bestått?',
                        svar: 'Ja',
                    },
                    {
                        sporsmalId: 'andreForhold',
                        sporsmal: 'Har du andre problemer med å søke eller være i jobb?',
                        svar: 'Nei',
                    },
                    {
                        sporsmalId: 'sisteStilling',
                        sporsmal: 'Hva er din siste jobb?',
                        svar: 'Sushikokk',
                    },
                    {
                        sporsmalId: 'helseHinder',
                        sporsmal: 'Har du helseproblemer som hindrer deg i å søke eller være i jobb?',
                        svar: 'Nei',
                    },
                ],
                sisteStilling: {
                    label: 'Sushikokk',
                    konseptId: 21838,
                    styrk08: '5120',
                },
                profilering: {
                    innsatsgruppe: 'STANDARD_INNSATS',
                    alder: 45,
                    jobbetSammenhengendeSeksAvTolvSisteManeder: true,
                },
                manueltRegistrertAv: null,
            },
            type: 'ORDINAER',
        },
    },
    brukerInfo: {
        status: 200,
        data: {
            maksDato: null,
            underOppfolging: true,
            erSykmeldtMedArbeidsgiver: false,
            jobbetSeksAvTolvSisteManeder: null,
            registreringType: 'ALLEREDE_REGISTRERT',
            harIgangsattRegistreringSomKanGjenopptas: false,
            formidlingsgruppe: null,
            servicegruppe: null,
            rettighetsgruppe: null,
            geografiskTilknytning: '5427',
            alder: 45,
        },
    },
    ulesteDialoger: {
        status: 200,
        data: {
            antallUleste: 0,
        },
    },
};

export default arbeidssokerInnholdMock;
