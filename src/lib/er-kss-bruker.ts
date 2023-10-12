import * as Brukerregistrering from '../hooks/use-brukerregistrering-data';
import * as Oppfolging from '../hooks/use-oppfolging-data';
import * as BrukerInfo from '../hooks/use-brukerinfo-data';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';

export function erKSSBruker({
    brukerInfoData,
    oppfolgingData,
    registreringData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;

    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 55;

    return (
        aldersgruppeUtenForsterketInnsats &&
        !erAAP &&
        sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
        !oppfolgingData.kanReaktiveres
    );
}
