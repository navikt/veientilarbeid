import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { kanViseOnboardingYtelser } from '../../lib/kan-vise-ytelser';
import Sluttkort from './sluttkort';
import Tema from '../tema/tema';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';

function YtelserOnboarding() {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const brukerInfoData = useBrukerinfoData();
    const amplitudeData = useAmplitudeData();

    const kanViseKomponent = kanViseOnboardingYtelser({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    if (!kanViseKomponent) return null;

    const innhold = [<Sluttkort />];

    return (
        <Tema
            header="Spørsmål om ytelser"
            innhold={innhold}
            id="ytelser"
            hoppOverPreState={false}
            amplitudeTemaTag="ytelser"
        />
    );
}

export default YtelserOnboarding;
