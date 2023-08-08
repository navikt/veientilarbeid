interface NesteMeldekort {
    fra: string;
    kanSendesFra: string;
    risikererTrekk: boolean;
    sisteDatoForTrekk: string;
    til: string;
    uke: string;
}

interface NyeMeldekort {
    antallNyeMeldekort: number;
    nesteInnsendingAvMeldekort: string | null;
    nesteMeldekort: NesteMeldekort | null;
}

export interface MeldekortData {
    etterregistrerteMeldekort: number;
    meldekortbruker: boolean;
    nyeMeldekort: NyeMeldekort | null;
    resterendeFeriedager: number;
}

interface NesteMeldekortFraApi {
    uke: string;
    kanSendesFra: string;
    fra: string;
    til: string;
}

export interface MeldekortDataFraApi {
    meldekort: number;
    etterregistrerteMeldekort: number;
    antallGjenstaaendeFeriedager: number;
    nesteMeldekort: NesteMeldekortFraApi | null;
    nesteInnsendingAvMeldekort: string | null;
}
