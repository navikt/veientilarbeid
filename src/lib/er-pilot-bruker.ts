import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import { AmplitudeData } from '../metrics/amplitude-utils';

export function erPilotBruker({
    brukerInfoData,
    oppfolgingData,
    amplitudeData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    amplitudeData: AmplitudeData;
}): boolean {
    const skalSeEksperiment = amplitudeData.eksperimenter.includes('onboarding14a');
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';

    return !erAAP && skalSeEksperiment && !oppfolgingData.kanReaktiveres;
}
