import PreState from '../pre-state';

interface Props {
    hoppOverIntroCB: () => void;
    startIntroCB: () => void;
}

function Startkort(props: Props) {
    const { startIntroCB, hoppOverIntroCB } = props;
    return (
        <PreState
            tittel={'Det viktigste du trenger å vite om meldekort'}
            lesetid={'2'}
            viewportTekst="Viser meldekort pre-state i viewPort"
            startIntroCB={startIntroCB}
            hoppOverIntroCB={hoppOverIntroCB}
        />
    );
}

export default Startkort;
