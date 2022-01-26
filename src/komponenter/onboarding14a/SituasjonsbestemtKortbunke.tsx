import lagSituasjonsbestemtKortliste from './situasjonsbestemt';
import Tema from '../tema/tema';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const AMPLITUDE_TEMA_TAG = '14a';

const TEKSTER = {
    nb: {
        header: 'Hjelp og støtte',
    },
    en: {
        header: 'Help and support',
    },
};

const SituasjonsbestemtKortbunke = () => {
    const sprak = useSprakValg().sprak;
    const [Startkort, Kortliste, Sluttkort] = lagSituasjonsbestemtKortliste(sprak);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Tema
            header={tekst('header')}
            innhold={[<Startkort />, ...Kortliste, <Sluttkort />]}
            hoppOverPreState={false}
            id="14a-intro-situasjonsbestemt"
            amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
        />
    );
};

export default SituasjonsbestemtKortbunke;
