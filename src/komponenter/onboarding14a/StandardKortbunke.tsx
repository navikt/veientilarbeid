import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { KssStartkort, KssKortliste, KssSluttkort } from './kss';
import { StandardStartkort, StandardKortliste, StandardSluttkort } from './standardinnsats';
import { UngdomsinnsatsStartkort, UngdomsinnsatsKortliste, UngdomsinnsatsSluttkort } from './ungdomsinnsats';
import { erKSSBruker } from '../../lib/er-kss-bruker';
import Tema from '../tema/tema';
import './14a-intro.less';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import sjekkOmBrukerErUngdomsinnsats from '../../lib/er-ungdomsinnsats';

const INTRO_KEY_14A = '14a-intro';
const AMPLITUDE_TEMA_TAG = '14a';

function hentKortbunke(
    skalViseKssKort: boolean,
    skalViseUngdomsinnsatsKort: boolean
): [() => JSX.Element, JSX.Element[], () => JSX.Element] {
    if (skalViseKssKort) {
        return [KssStartkort, KssKortliste, KssSluttkort];
    }

    if (skalViseUngdomsinnsatsKort) {
        return [UngdomsinnsatsStartkort, UngdomsinnsatsKortliste, UngdomsinnsatsSluttkort];
    }

    return [StandardStartkort, StandardKortliste, StandardSluttkort];
}

function Intro14AWrapper() {
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

    const skalViseUngdomsinnsatsKort = sjekkOmBrukerErUngdomsinnsats({ brukerInfoData, featuretoggleData });

    const [Startkort, Kortliste, Sluttkort] = hentKortbunke(skalViseKssKort, skalViseUngdomsinnsatsKort);

    const innhold = (
        <Tema
            innhold={[<Startkort />, ...Kortliste, <Sluttkort />]}
            header="Hjelp og støtte"
            hoppOverPreState={false}
            hoppRettTilSluttkort={!erNyregistrert}
            id={INTRO_KEY_14A}
            amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
            lesPaaNyttLenkeTekst="Les om hva slags hjelp du kan få"
        />
    );

    return innhold;
}

export default Intro14AWrapper;
