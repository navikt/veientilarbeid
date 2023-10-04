import { hentBrukerRegistrering } from '../demo/demo-state-brukerregistrering';

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
            registrering: hentBrukerRegistrering().registrering,
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
