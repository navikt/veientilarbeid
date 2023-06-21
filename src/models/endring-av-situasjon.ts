import { DinSituasjonSvar } from '../contexts/brukerregistrering';

export enum PermittertSvar {
    OPPSIGELSE = 'OPPSIGELSE',
    ENDRET_PERMITTERINGSPROSENT = 'ENDRET_PERMITTERINGSPROSENT',
    TILBAKE_TIL_JOBB = 'TILBAKE_TIL_JOBB',
    NY_JOBB = 'NY_JOBB',
    MIDLERTIDIG_JOBB = 'MIDLERTIDIG_JOBB',
    KONKURS = 'KONKURS',
    SAGT_OPP = 'SAGT_OPP',
    ANNET = 'ANNET',
}
export const dinSituasjonSvarTekster = {
    [DinSituasjonSvar.MISTET_JOBBEN]: 'Har mistet eller kommer til å miste jobben',
    [DinSituasjonSvar.HAR_SAGT_OPP]: 'Har sagt opp eller kommer til å si opp',
    [DinSituasjonSvar.DELTIDSJOBB_VIL_MER]: 'Har deltidsjobb, men vil jobbe mer',
    [DinSituasjonSvar.ALDRI_HATT_JOBB]: 'Har aldri vært i jobb',
    [DinSituasjonSvar.VIL_BYTTE_JOBB]: 'Har jobb, men vil bytte',
    [DinSituasjonSvar.JOBB_OVER_2_AAR]: 'Har ikke vært i jobb de siste 2 årene',
    [DinSituasjonSvar.ER_PERMITTERT]: 'Er permittert eller kommer til å bli permittert',
    [DinSituasjonSvar.USIKKER_JOBBSITUASJON]: 'Er usikker på jobbsituasjonen min',
    [DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING]: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB]: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
};

export const permittertTekster = {
    [PermittertSvar.TILBAKE_TIL_JOBB]: 'Jeg skal tilbake i jobb hos min nåværende arbeidsgiver',
    [PermittertSvar.OPPSIGELSE]: 'Jeg har blitt oppsagt',
    [PermittertSvar.ENDRET_PERMITTERINGSPROSENT]: ' Arbeidsgiver har endret permitteringen min',
    [PermittertSvar.NY_JOBB]: 'Jeg skal begynne å jobbe hos en ny arbeidsgiver',
    [PermittertSvar.MIDLERTIDIG_JOBB]: 'Jeg har fått midlertidig jobb hos en ny arbeidsgiver',
    [PermittertSvar.KONKURS]: 'Min arbeidsgiver er konkurs',
    [PermittertSvar.SAGT_OPP]: 'Jeg har sagt opp jobben min',
    [PermittertSvar.ANNET]: 'Annet',
};
