import { DinSituasjonSvar } from '../contexts/brukerregistrering';

export enum PermittertSvar {
    OPPSIGELSE = 'OPPSIGELSE',
    ENDRET_PERMITTERINGSPROSENT = 'ENDRET_PERMITTERINGSPROSENT',
    TILBAKE_TIL_JOBB = 'TILBAKE_TIL_JOBB',
    NY_JOBB = 'NY_JOBB',
    MIDLERTIDIG_JOBB = 'MIDLERTIDIG_JOBB',
    KONKURS = 'KONKURS',
    UAVKLART = 'UAVKLART',
    ANNET = 'ANNET',
}

// export enum DinSituasjonSvar {
//     MISTET_JOBBEN = 'MISTET_JOBBEN',
//     HAR_SAGT_OPP = 'HAR_SAGT_OPP',
//     DELTIDSJOBB_VIL_MER = 'DELTIDSJOBB_VIL_MER',
//     ALDRI_HATT_JOBB = 'ALDRI_HATT_JOBB',
//     VIL_BYTTE_JOBB = 'VIL_BYTTE_JOBB',
//     JOBB_OVER_2_AAR = 'JOBB_OVER_2_AAR',
//     ER_PERMITTERT = 'ER_PERMITTERT',
//     USIKKER_JOBBSITUASJON = 'USIKKER_JOBBSITUASJON',
//     AKKURAT_FULLFORT_UTDANNING = 'AKKURAT_FULLFORT_UTDANNING',
//     VIL_FORTSETTE_I_JOBB = 'VIL_FORTSETTE_I_JOBB',
// }

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
    [PermittertSvar.OPPSIGELSE]: 'Jeg har fått oppsigelse',
    [PermittertSvar.ENDRET_PERMITTERINGSPROSENT]: 'Permitteringsprosenten har endret seg',
    [PermittertSvar.TILBAKE_TIL_JOBB]: 'Skal tilbake til jobben',
    [PermittertSvar.NY_JOBB]: 'Jeg har fått meg ny jobb',
    [PermittertSvar.MIDLERTIDIG_JOBB]: 'Jeg har fått midlertidig jobb',
    [PermittertSvar.KONKURS]: 'Bedriften er konkurs',
    [PermittertSvar.UAVKLART]: 'Arbeidssituasjonen min er uavklart',
    [PermittertSvar.ANNET]: 'Annet',
};
