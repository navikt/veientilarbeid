// import { Data as FeaturetoggleData } from '../ducks/feature-toggles';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Meldekort from '../contexts/meldekort';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import * as FeatureToggles from '../contexts/feature-toggles';
import erStandardInnsatsgruppe from './er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';
import { AmplitudeData } from '../metrics/amplitude-utils';
import { erPilotBruker } from './er-pilot-bruker';

export function kanViseMeldekortStatus({
    meldekortData,
    brukerInfoData,
    oppfolgingData,
    registreringData,
    // featuretoggleData,
    amplitudeData,
}: {
    meldekortData: Meldekort.Data | null;
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeatureToggles.Data;
    amplitudeData: AmplitudeData;
}): boolean {
    const meldekortliste = meldekortData?.meldekort ?? [];
    const harMeldekort = meldekortliste.length > 0;
    if (!harMeldekort) return false;

    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const harDagpengerEllerArbeidssokerMeldekort =
        meldekortliste.filter((meldekort) => ['DAGP', 'ARBS'].includes(meldekort.meldegruppe ?? 'NULL')).length > 0;

    const brukerregistreringData = registreringData?.registrering ?? null;
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    // const onboardingForSituasjonsbestemtToggle = featuretoggleData['veientilarbeid.meldekort-intro.situasjonsbestemt'];

    const brukerErPilot = erPilotBruker({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        amplitudeData,
    });

    const skalViseOnboardingForSituasjonsbestemt = erSituasjonsbestemtInnsatsgruppe && brukerErPilot;

    const kanViseKomponent =
        !erAAP &&
        harDagpengerEllerArbeidssokerMeldekort &&
        (erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) ||
            skalViseOnboardingForSituasjonsbestemt) &&
        !oppfolgingData.kanReaktiveres;

    return kanViseKomponent;
}
