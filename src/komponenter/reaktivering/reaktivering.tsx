import * as React from 'react';

import { useProfil } from '../../contexts/profil';
import { useAmplitudeData } from '../../contexts/amplitude-context';

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

function bestemReaktiveringVisning(valgtVisning: JaEllerNei): string {
    return valgAvVisningErUtdatert(valgtVisning) ? 'ja' : valgtVisning.valg;
}

const Reaktivering = () => {
    const { profil, lagreProfil } = useProfil();

    const valgtReaktiveringVisning: JaEllerNei = profil?.['aiaReaktiveringVisning'] ?? {
        oppdatert: new Date().toISOString(),
        valg: 'ja',
    };

    const reaktiveringVisning = bestemReaktiveringVisning(valgtReaktiveringVisning);
    const [visReaktiveringAdvarsel, setVisReaktiveringAdvarsel] = React.useState(reaktiveringVisning);

    const { amplitudeData } = useAmplitudeData();

    const handleIkkeReaktivering = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Velger ikke vis reaktivering', ...amplitudeData });

        const reaktiveringsvalg = { oppdatert: new Date().toISOString(), valg: 'nei' } as JaEllerNei;

        lagreProfil({ aiaReaktiveringVisning: reaktiveringsvalg });
        setVisReaktiveringAdvarsel(reaktiveringsvalg.valg);
    };

    return visReaktiveringAdvarsel === 'ja' ? (
        <ReaktiveringAktuelt handleIkkeReaktivering={handleIkkeReaktivering} />
    ) : (
        <ReaktiveringKanskjeAktuelt />
    );
};

export default Reaktivering;
