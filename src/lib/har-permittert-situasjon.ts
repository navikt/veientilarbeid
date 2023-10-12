import { BesvarelseResponse } from '../contexts/besvarelse';
import { PermittertSvar } from '../models/endring-av-situasjon';
import { Brukerregistrering, DinSituasjonSvar } from '../hooks/use-brukerregistrering-data';

const permitterteTilstander = [
    PermittertSvar.ENDRET_PERMITTERINGSPROSENT,
    PermittertSvar.MIDLERTIDIG_JOBB,
    PermittertSvar.TILBAKE_TIL_JOBB,
    PermittertSvar.ANNET,
    PermittertSvar.SAGT_OPP,
    DinSituasjonSvar.ER_PERMITTERT,
];
export function harPermittertSituasjon(
    brukerRegistrering?: Brukerregistrering,
    besvarelse?: BesvarelseResponse,
): boolean {
    if (besvarelse?.erBesvarelsenEndret) {
        return permitterteTilstander.includes(besvarelse?.besvarelse?.dinSituasjon?.verdi as any);
    }

    return brukerRegistrering?.besvarelse?.dinSituasjon === DinSituasjonSvar.ER_PERMITTERT;
}
