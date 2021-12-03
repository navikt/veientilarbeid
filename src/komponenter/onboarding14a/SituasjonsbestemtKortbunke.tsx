import {
    SituasjonsbestemtSluttkort,
    SituasjonsbestemtKortliste,
    SituasjonsbestemtStartkort,
} from './situasjonsbestemt';
import Tema from '../tema/tema';

const AMPLITUDE_TEMA_TAG = '14a';

const SituasjonsbestemtKortbunke = () => {
    const innhold = [<SituasjonsbestemtStartkort />, ...SituasjonsbestemtKortliste, <SituasjonsbestemtSluttkort />];

    return (
        <Tema
            header="Hjelp og støtte"
            innhold={innhold}
            hoppOverPreState={false}
            id="14a-intro-situasjonsbestemt"
            amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
        />
    );
};

export default SituasjonsbestemtKortbunke;
