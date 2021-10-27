import PreState from '../../onboardingMeldekort/pre-state';

interface Props {
    hoppOverIntroCB: () => void;
    startIntroCB: () => void;
}

function Startkort(props: Props) {
    return (
        <PreState
            tematag="HJELP OG STØTTE"
            hoppOverIntroCB={props.hoppOverIntroCB}
            startIntroCB={props.startIntroCB}
            lesetid={'3'}
            viewportTekst="Viser 14a pre-state i viewport"
            tittel={'Introduksjon til veiledning og hjelp til jobbsøking'}
        />
    );
}

export default Startkort;
