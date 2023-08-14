export interface Vedtak {
    vedtakId: string;
    fagsakId: string;
    status: string;
    datoFattet: string;
    fraDato: string;
    tilDato?: string;
}

export interface DpInnsynSoknad {
    søknadId: string;
    skjemaKode: String;
    tittel: string;
    journalpostId: string;
    søknadsType: string;
    kanal: string;
    datoInnsendt: string;
    vedlegg: [
        {
            skjemaNummer: string;
            navn: string;
            status: string; // INNVILGET | AVSLÅTT | STANS | ENDRING
        },
    ];
}
