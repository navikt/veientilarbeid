import PreState from '../pre-state';

interface Props {
    hoppOverIntroCB: () => void;
    startIntroCB: () => void;
}

function Startkort(props: Props) {
    const { startIntroCB, hoppOverIntroCB } = props;
    return (
        <PreState
            tematag="MELDEKORT"
            tittel={'Det viktigste du trenger å vite om meldekort'}
            lesetid={'2'}
            viewportTekst="Viser meldekortintro pre-state for situasjonsbestemt i viewPort"
            startIntroCB={startIntroCB}
            hoppOverIntroCB={hoppOverIntroCB}
        />
    );
}

export default Startkort;
