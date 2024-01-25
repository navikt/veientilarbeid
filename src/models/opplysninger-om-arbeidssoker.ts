type UtfoertAv = {
    type: string;
};

type SendtInnAv = {
    tidspunkt: string;
    utfoertAv: UtfoertAv;
    kilde: string;
    aarsak: string;
};

type Utdanning = {
    lengde: string;
    bestaatt: string;
    godkjent: string;
};

type Helse = {
    helseTilstandHindrerArbeid: string;
};

type Arbeidserfaring = {
    harHattArbeid: string;
};

type Annet = {
    andreForholdHindrerArbeid: string;
};

type Jobbsituasjon = {
    beskrivelse: string;
    detaljer: string;
};

export type OpplysningerOmArbeidssoker = {
    opplysningerOmArbeidssoekerId: string;
    periodeId: string;
    sendtInnAv: SendtInnAv;
    utdanning: Utdanning;
    helse: Helse;
    arbeidserfaring: Arbeidserfaring;
    annet: Annet;
    jobbsituasjon: Jobbsituasjon[];
};

export type OpplysningerOmArbeidssokerResponse = OpplysningerOmArbeidssoker[] | [];
