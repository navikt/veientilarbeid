import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { KssStartkort, KssKortliste, KssSluttkort } from './kss';
import lagStandardKort from './standardinnsats';
import { UngdomsinnsatsStartkort, UngdomsinnsatsKortliste, UngdomsinnsatsSluttkort } from './ungdomsinnsats';
import { erKSSBruker } from '../../lib/er-kss-bruker';
import Tema from '../tema/tema';
import './14a-intro.less';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import sjekkOmBrukerErUngdomsinnsats from '../../lib/er-ungdomsinnsats';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { Sprak, useSprakValg } from '../../contexts/sprak';

const INTRO_KEY_14A = '14a-intro';
const AMPLITUDE_TEMA_TAG = '14a';

const TEKSTER = {
    nb: {
        header: 'Hjelp og støtte',
        lesPaaNyttLenkeTekst: 'Les om hva slags hjelp du kan få',
    },
    en: {
        header: 'Help and support',
        lesPaaNyttLenkeTekst: 'What kind of help can I get?',
    },
};

function hentKortbunke(
    skalViseKssKort: boolean,
    skalViseUngdomsinnsatsKort: boolean,
    sprak: Sprak
): [() => JSX.Element, JSX.Element[], () => JSX.Element] {
    if (skalViseKssKort) {
        return [KssStartkort, KssKortliste, KssSluttkort];
    }

    if (skalViseUngdomsinnsatsKort) {
        return [UngdomsinnsatsStartkort, UngdomsinnsatsKortliste, UngdomsinnsatsSluttkort];
    }

    return lagStandardKort(sprak);
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
    const sprak = useSprakValg().sprak;
    const hentTekst = lagHentTekstForSprak(TEKSTER, sprak);

    const [Startkort, Kortliste, Sluttkort] = hentKortbunke(skalViseKssKort, skalViseUngdomsinnsatsKort, sprak);

    const innhold = (
        <Tema
            innhold={[<Startkort />, ...Kortliste, <Sluttkort />]}
            header={hentTekst('header')}
            hoppOverPreState={false}
            hoppRettTilSluttkort={!erNyregistrert}
            id={INTRO_KEY_14A}
            amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
            lesPaaNyttLenkeTekst={hentTekst('lesPaaNyttLenkeTekst')}
        />
    );

    return innhold;
}

export default Intro14AWrapper;
