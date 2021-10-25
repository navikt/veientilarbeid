import { Data as FeaturetoggleData } from '../ducks/feature-toggles';
import * as Brukerregistrering from '../ducks/brukerregistrering';
import * as Oppfolging from '../ducks/oppfolging';
import * as BrukerInfo from '../ducks/bruker-info';
import { AmplitudeData } from '../metrics/amplitude-utils';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';

export function kanViseOnboarding14A({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    amplitudeData,
    featuretoggleData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    amplitudeData: AmplitudeData;
    featuretoggleData: FeaturetoggleData;
}): boolean {
    const skalSeEksperiment = amplitudeData.eksperimenter.includes('onboarding14a');
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.14a-intro'];

    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 55;

    return (
        featuretoggleAktivert &&
        aldersgruppeUtenForsterketInnsats &&
        !erAAP &&
        skalSeEksperiment &&
        sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
        !oppfolgingData.kanReaktiveres
    );
}
