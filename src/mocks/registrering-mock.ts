import {Data as RegistreringData, FremtidigSituasjonSvar, RegistreringType } from '../ducks/registrering';

export default {
    type: RegistreringType.SYKMELDT,
    registrering: {
        besvarelse: {
            fremtidigSituasjon: FremtidigSituasjonSvar.USIKKER
        }
    }
} as RegistreringData;