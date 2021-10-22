import PreState from '../../meldekortintro/pre-state';

interface Props {
    hoppOverIntroCB: () => void;
    startIntroCB: () => void;
}

function Startkort(props: Props) {
    return (
        <PreState
            hoppOverIntroCB={props.hoppOverIntroCB}
            startIntroCB={props.startIntroCB}
            lesetid={'3'}
            viewportTekst="Viser 14a pre-state i viewport"
            tittel={'Introduksjon til veiledning og hjelp til jobbsøking'}
        />
    );
}

export default Startkort;
