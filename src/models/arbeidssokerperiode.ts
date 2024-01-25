type ArbeidssokerperiodeUtfoertAv = {
    type: string;
};

type ArbeidssokerperiodeMetadata = {
    tidspunkt: string;
    utfoertAv: ArbeidssokerperiodeUtfoertAv;
    kilde: string;
    aarsak: string;
};

export type ArbeidssokerPeriode = {
    perioderId: string;
    startet: ArbeidssokerperiodeMetadata;
    avsluttet: ArbeidssokerperiodeMetadata;
};

export type ArbeidssokerperioderResponse = ArbeidssokerPeriode[] | [];
