import { useEffect, useState, SyntheticEvent } from 'react';

import { useProfil } from '../../contexts/profil';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useMeldeplikt, Meldeplikt } from '../../contexts/meldeplikt';

import { JaEllerNei } from '../../profil';
import { loggAktivitet } from '../../metrics/metrics';
import ReaktiveringAktuelt from './reaktivering-aktuelt';
import ReaktiveringKanskjeAktuelt from './reaktivering-kanskje-aktuelt';

function valgAvVisningErUtdatert(valgtVisning: JaEllerNei): boolean {
    // Hvis man velger at man ikke har behov for å være registrert lenger, skal dette bare være gyldig i 28 dager,
    // sånn at det gamle valget ikke blir stående hvis man havner i den samme situasjonen på nytt senere.
    const valgtVisningDato = new Date(new Date(valgtVisning.oppdatert).toISOString().substr(0, 10));
    const datoNaa = new Date(new Date().toISOString().substr(0, 10));
    const millis = datoNaa.getMilliseconds() - valgtVisningDato.getMilliseconds();
    const dagerSidenValg = millis > 0 ? Math.floor(millis / 86400000) : 1;

    return dagerSidenValg >= 28;
}

function bestemReaktiveringVisning(valgtVisning: JaEllerNei, meldeplikt: Meldeplikt | null): string {
    if (meldeplikt) {
        return meldeplikt.erArbeidssokerNestePeriode === true ? 'ja' : 'nei';
    }
    return valgAvVisningErUtdatert(valgtVisning) ? 'ja' : valgtVisning.valg;
}

const Reaktivering = () => {
    const { profil, lagreProfil } = useProfil();
    const { meldeplikt } = useMeldeplikt();
    const { amplitudeData } = useAmplitudeData();

    const valgtReaktiveringVisning: JaEllerNei = profil?.['aiaReaktiveringVisning'] ?? {
        oppdatert: new Date().toISOString(),
        valg: 'ja',
    };

    const reaktiveringVisning = bestemReaktiveringVisning(valgtReaktiveringVisning, meldeplikt);
    const [visReaktiveringAdvarsel, setVisReaktiveringAdvarsel] = useState(reaktiveringVisning);

    const handleIkkeReaktivering = (event: SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Velger ikke vis reaktivering', ...amplitudeData });

        const reaktiveringsvalg = { oppdatert: new Date().toISOString(), valg: 'nei' } as JaEllerNei;

        lagreProfil({ aiaReaktiveringVisning: reaktiveringsvalg });
        setVisReaktiveringAdvarsel(reaktiveringsvalg.valg);
    };

    useEffect(() => {
        setVisReaktiveringAdvarsel(reaktiveringVisning);
    }, [reaktiveringVisning]);

    return visReaktiveringAdvarsel === 'ja' ? (
        <ReaktiveringAktuelt handleIkkeReaktivering={handleIkkeReaktivering} />
    ) : (
        <ReaktiveringKanskjeAktuelt />
    );
};

export default Reaktivering;
