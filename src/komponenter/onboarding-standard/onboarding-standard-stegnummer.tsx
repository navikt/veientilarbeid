import TallSirkel from '../tall/tall';
import { erStandardTilknyttetArbeid } from '../../lib/er-standard-tilknyttet-arbeid';
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

    const kanViseKomponent = erStandardTilknyttetArbeid({
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
