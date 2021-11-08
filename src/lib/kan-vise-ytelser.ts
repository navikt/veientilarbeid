import { Data as FeaturetoggleData } from '../contexts/feature-toggles';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import sjekkOmBrukerErStandardInnsatsgruppe from './er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';
import { AmplitudeData } from '../metrics/amplitude-utils';
import { erPilotBruker } from './er-pilot-bruker';

export function kanViseOnboardingYtelser({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    featuretoggleData,
    amplitudeData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeaturetoggleData;
    amplitudeData: AmplitudeData;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerErPilot = erPilotBruker({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        amplitudeData,
    });
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });
    const visYtelserForSituasjonsbestemtToggle = featuretoggleData['veientilarbeid.ytelser.situasjonsbestemt'];

    const kanViseForSituasjonsbestemt =
        erSituasjonsbestemtInnsatsgruppe && brukerErPilot && visYtelserForSituasjonsbestemtToggle;

    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });

    const kanViseForStandard = erStandardInnsatsgruppe && !brukerErPilot;

    return !erAAP && (kanViseForStandard || kanViseForSituasjonsbestemt) && !oppfolgingData.kanReaktiveres;
}
