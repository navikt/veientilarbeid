import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useMeldekortData } from '../../contexts/meldekort';
import { useOppfolgingData } from '../../contexts/oppfolging';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import { kanViseMeldekortStatus } from '../../lib/kan-vise-meldekort-status';
import { fjernFraBrowserStorage } from '../../utils/browserStorage-utils';
import Onboarding from '../ny_onboarding/onboarding';
import { SituasjonsbestemtKortliste, SituasjonsbestemtStartkort } from './situasjonsbestemt';
import Sluttkort from './Sluttkort';
import { StandardKortliste, StandardStartkort } from './standard';

const MeldekortOnboarding = () => {
    const featuretoggleData = useFeatureToggleData();
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const amplitudeData = useAmplitudeData();
    const meldekortData = useMeldekortData();
    const brukerInfoData = useBrukerinfoData();

    const MELDEKORT_ONBOARDING_KEY = 'meldekortintro';

    const brukerregistreringData = registreringData?.registrering ?? null;

    const onboardingForSituasjonsbestemtToggle =
        featuretoggleData['veientilarbeid.onboardingMeldekort.situasjonsbestemt'];
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    if (
        !kanViseMeldekortStatus({
            meldekortData,
            oppfolgingData,
            brukerInfoData,
            registreringData,
            featuretoggleData,
            amplitudeData,
        })
    ) {
        fjernFraBrowserStorage(MELDEKORT_ONBOARDING_KEY);
        return null;
    }

    const skalViseOnboardingForSituasjonsbestemt =
        onboardingForSituasjonsbestemtToggle && erSituasjonsbestemtInnsatsgruppe;
    const introKort = skalViseOnboardingForSituasjonsbestemt
        ? [<SituasjonsbestemtStartkort />, ...SituasjonsbestemtKortliste, <Sluttkort />]
        : [<StandardStartkort />, ...StandardKortliste, <Sluttkort />];

    const erNyregistrert = amplitudeData.ukerRegistrert === 0;
    const hoppOverPreState = false;

    return (
        <Onboarding
            header="Meldekort"
            id={MELDEKORT_ONBOARDING_KEY}
            hoppOverPreState={hoppOverPreState}
            hoppRettTilSluttkort={!erNyregistrert}
            innhold={introKort}
        />
    );
};

export default MeldekortOnboarding;
