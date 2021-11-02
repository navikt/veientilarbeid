// import { Data as FeaturetoggleData } from '../ducks/feature-toggles';
import * as Brukerregistrering from '../context/brukerregistrering';
import * as Meldekort from '../ducks/meldekort';
import * as Oppfolging from '../context/oppfolging';
import * as BrukerInfo from '../context/bruker-info';
import * as FeatureToggles from '../context/feature-toggles';
import erStandardInnsatsgruppe from './er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';

export function kanViseMeldekortStatus({
    meldekortData,
    brukerInfoData,
    oppfolgingData,
    registreringData,
    featuretoggleData,
}: {
    meldekortData: Meldekort.Data | null;
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeatureToggles.Data;
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
    const onboardingForSituasjonsbestemtToggle = featuretoggleData['veientilarbeid.meldekort-intro.situasjonsbestemt'];

    const skalViseOnboardingForSituasjonsbestemt =
        onboardingForSituasjonsbestemtToggle && erSituasjonsbestemtInnsatsgruppe;

    const kanViseKomponent =
        !erAAP &&
        harDagpengerEllerArbeidssokerMeldekort &&
        (erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) ||
            skalViseOnboardingForSituasjonsbestemt) &&
        !oppfolgingData.kanReaktiveres;

    return kanViseKomponent;
}
