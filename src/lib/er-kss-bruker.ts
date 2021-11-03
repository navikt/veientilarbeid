import { Data as FeaturetoggleData } from '../contexts/feature-toggles';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import { AmplitudeData } from '../metrics/amplitude-utils';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';

export function erKSSBruker({
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
