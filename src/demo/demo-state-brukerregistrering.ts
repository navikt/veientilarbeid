import { Besvarelse, ForeslattInnsatsgruppe, FremtidigSituasjonSvar, Profilering } from '../ducks/brukerregistrering';
import { DemoData, hentFraLocalStorage, settILocalStorage } from './demo-state';

const settRegistrering = (besvarelse?: Besvarelse, profilering?: Profilering) => {
    const data = {
        registrering: {
            besvarelse: besvarelse || {fremtidigSituasjon: hentFremtidigSituasjon()},
            profilering: profilering || {innsatsgruppe: hentForeslattInnsatsgruppe()},
        }
    };

    settILocalStorage(DemoData.BRUKER_REGISTRERING, JSON.stringify(data));
};

export const settFremtidigSituasjon = (fremtidigSituasjon: FremtidigSituasjonSvar) => {
    settRegistrering(
        {fremtidigSituasjon: fremtidigSituasjon},
        undefined,
    );
};

export const settForeslattInnsatsgruppe = (innsatsgruppe: ForeslattInnsatsgruppe) => {
    settRegistrering(
        undefined,
        {
            innsatsgruppe: innsatsgruppe,
        }
    )
};

const defaultFremtidigSituasjon = FremtidigSituasjonSvar.NY_ARBEIDSGIVER;
const defaultForeslattInnsatsgruppe = ForeslattInnsatsgruppe.STANDARD_INNSATS;

export const hentBrukerRegistreringData = () => {
    const data = hentFraLocalStorage(DemoData.BRUKER_REGISTRERING);

    return data ? JSON.parse(data) : {
        registrering: {
            besvarelse: {
                fremtidigSituasjon: defaultFremtidigSituasjon,
            },
            profilering: {
                innsatsgruppe: defaultForeslattInnsatsgruppe,
            }
        }
    };

};

export const hentFremtidigSituasjon = (): string => {
    const data = hentBrukerRegistreringData();

    if (data.registrering && data.registrering.besvarelse && data.registrering.besvarelse.fremtidigSituasjon) {
        return data.registrering.besvarelse.fremtidigSituasjon;
    }

    return defaultFremtidigSituasjon;
};

export const hentForeslattInnsatsgruppe = (): string => {
    const data = hentBrukerRegistreringData();

    if (data.registrering && data.registrering.profilering && data.registrering.profilering.innsatsgruppe) {
        return data.registrering.profilering.innsatsgruppe;
    }

    return defaultForeslattInnsatsgruppe;
};