import TallSirkel from '../tall/tall';
import { erStandardTilknyttetArbeid } from '../../lib/er-standard-tilknyttet-arbeid';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../../contexts/amplitude-context';

interface Props {
    tall: Number;
    inverted?: boolean;
}

const OnboardingStandardStegnummer = (props: Props) => {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const amplitudeData = useAmplitudeData();

    const erNyregistert = amplitudeData.ukerRegistrert === 0;
    const erTilknyttetArbeidogStandardInnsats = erStandardTilknyttetArbeid({
        oppfolgingData,
        registreringData,
        featuretoggleData,
    });

    const kanViseKomponent = erNyregistert && erTilknyttetArbeidogStandardInnsats;

    if (!kanViseKomponent) {
        return null;
    }

    return <TallSirkel tall={props.tall} inverted={props.inverted} />;
};

export default OnboardingStandardStegnummer;
