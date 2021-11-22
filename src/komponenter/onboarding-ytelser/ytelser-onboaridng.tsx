import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { kanViseOnboardingYtelser } from '../../lib/kan-vise-ytelser';
import SluttkortYtelser from './ytelser/sluttkort';
import SluttkortDagpenger from './dagpenger/sluttkort';
import Tema from '../tema/tema';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { kanViseOnboardingDagpenger } from '../../lib/kan-vise-onboarding-dagpenger';

function YtelserOnboarding() {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const brukerInfoData = useBrukerinfoData();
    const amplitudeData = useAmplitudeData();

    const kanViseYtelserKomponent = kanViseOnboardingYtelser({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const kanViseDagpengerKomponent = kanViseOnboardingDagpenger({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    if (!kanViseYtelserKomponent && !kanViseDagpengerKomponent) return null;

    const visOnboardingDagpenger = featuretoggleData['veientilarbeid.onboardingDagpenger'];
    // const visOnboardingDagpengerToggleLenke = featuretoggleData['veientilarbeid.onboardingDagpenger.toggle'];

    if (!visOnboardingDagpenger || kanViseYtelserKomponent) {
        return (
            <Tema
                header="Spørsmål om ytelser"
                innhold={[<SluttkortYtelser />]}
                id="ytelser"
                hoppOverPreState={false}
                amplitudeTemaTag="ytelser"
            />
        );
    }
    if (visOnboardingDagpenger && kanViseDagpengerKomponent) {
        return (
            <Tema
                header="Dagpenger"
                innhold={[<SluttkortDagpenger />]}
                id="dagpenger"
                hoppOverPreState={false}
                amplitudeTemaTag="ytelser"
            />
        );
    }
    return null;
}

export default YtelserOnboarding;
