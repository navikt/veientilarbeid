import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import Sluttkort from './sluttkort';
import Tema from '../tema/tema';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { kanViseOnboardingDagpenger } from '../../lib/kan-vise-onboarding-dagpenger';

function DagpengerOnboarding() {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const brukerInfoData = useBrukerinfoData();
    const amplitudeData = useAmplitudeData();

    const kanViseKomponent = kanViseOnboardingDagpenger({
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
            header="Dagpenger"
            innhold={innhold}
            id="dagpenger"
            hoppOverPreState={false}
            amplitudeTemaTag="dagpenger"
        />
    );
}

export default DagpengerOnboarding;
