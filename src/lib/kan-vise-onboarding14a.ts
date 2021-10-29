import { Data as FeaturetoggleData } from '../ducks/feature-toggles';
import * as Brukerregistrering from '../ducks/brukerregistrering';
import * as Oppfolging from '../ducks/oppfolging';
import * as BrukerInfo from '../ducks/bruker-info';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';

export function kanViseOnboarding14A({
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
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });
    const visOnboardingForSituasjonsbestemtToggle = featuretoggleData['veientilarbeid.onboarding14a.situasjonsbestemt'];
    const kanViseSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe && visOnboardingForSituasjonsbestemtToggle;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });

    return !erAAP && (erStandardInnsatsgruppe || kanViseSituasjonsbestemt) && !oppfolgingData.kanReaktiveres;
}