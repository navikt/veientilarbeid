import { Data as FeaturetoggleData } from '../contexts/feature-toggles';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';

export function kanViseOnboardingDagpenger({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    featuretoggleData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeaturetoggleData;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';

    const brukerregistreringData = registreringData?.registrering ?? null;

    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    const visOnboardingDagpengerToggle = featuretoggleData['veientilarbeid.onboardingDagpenger'];
    const brukDpInnsynApiToggle = featuretoggleData['veientilarbeid.bruk-dp-innsyn-api'] || false;
    const kanViseForStandard = erStandardInnsatsgruppe && visOnboardingDagpengerToggle && brukDpInnsynApiToggle;

    return !erAAP && kanViseForStandard && !oppfolgingData.kanReaktiveres;
}
