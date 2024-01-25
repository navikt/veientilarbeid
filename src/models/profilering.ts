type UtfoertAv = {
    type: string;
};

type SendtInnAv = {
    tidspunkt: string;
    utfoertAv: UtfoertAv;
    kilde: string;
    aarsak: string;
};

export type Profilering = {
    profileringId: string;
    periodeId: string;
    opplysningerOmArbeidssoekerId: string;
    sendtInnAv: SendtInnAv;
    profilertTil: string;
    jobbetSammenhengendeSeksAvTolvSisteManeder: boolean;
    alder: number;
};

export type ProfileringResponse = Profilering[] | [];
