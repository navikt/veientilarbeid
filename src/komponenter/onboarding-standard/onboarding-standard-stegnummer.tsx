import TallSirkel from '../tall/tall';
import { skalViseOnboardingStandard } from '../../lib/skal-vise-onboarding-standard';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

interface Props {
    tall: Number;
    inverted?: boolean;
}

const OnboardingStandardStegnummer = (props: Props) => {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();

    const kanViseKomponent = skalViseOnboardingStandard({
        oppfolgingData,
        registreringData,
        featuretoggleData,
    });
    if (!kanViseKomponent) {
        return null;
    }
    return <TallSirkel tall={props.tall} inverted={props.inverted} />;
};

export default OnboardingStandardStegnummer;
