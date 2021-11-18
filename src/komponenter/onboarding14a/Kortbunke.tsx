import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { KssStartkort, KssKortliste, KssSluttkort } from './kss';
import { StandardStartkort, StandardKortliste, StandardSluttkort } from './standardinnsats';
import { erKSSBruker } from '../../lib/er-kss-bruker';
import Onboarding from '../onboarding/onboarding';
import './14a-intro.less';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';

const INTRO_KEY_14A = '14a-intro';
const AMPLITUDE_TEMA_TAG = '14a';

interface IntroProps {
    visKvittering?: string;
}

function Intro14AWrapper(props: IntroProps) {
    const amplitudeData = useAmplitudeData();
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const brukerInfoData = useBrukerinfoData();
    const featuretoggleData = useFeatureToggleData();

    const erNyregistrert = amplitudeData.ukerRegistrert === 0;

    const skalViseKssKort = erKSSBruker({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const [Startkort, Kortliste, Sluttkort] = skalViseKssKort
        ? [KssStartkort, KssKortliste, KssSluttkort]
        : [StandardStartkort, StandardKortliste, StandardSluttkort];

    const innhold = (
        <Onboarding
            innhold={[<Startkort />, ...Kortliste, <Sluttkort />]}
            header="Hjelp og støtte"
            hoppOverPreState={false}
            hoppRettTilSluttkort={!erNyregistrert}
            id={INTRO_KEY_14A}
            amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
            lesPaaNyttLnkeTekst="Les om hva slags hjelp du kan få"
        />
    );

    return innhold;
}

export default Intro14AWrapper;
