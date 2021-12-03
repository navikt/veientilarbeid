import { Data as FeaturetoggleData } from '../contexts/feature-toggles';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';
import { AmplitudeData } from '../metrics/amplitude-utils';

export function kanViseOnboardingYtelser({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    featuretoggleData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeaturetoggleData;
    amplitudeData: AmplitudeData;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });
    const visYtelserForSituasjonsbestemtToggle =
        featuretoggleData['veientilarbeid.onboardingYtelser.situasjonsbestemt'];

    const kanViseForSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe && visYtelserForSituasjonsbestemtToggle;

    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });

    const kanViseForStandard = erStandardInnsatsgruppe;

    return !erAAP && (kanViseForStandard || kanViseForSituasjonsbestemt) && !oppfolgingData.kanReaktiveres;
}
