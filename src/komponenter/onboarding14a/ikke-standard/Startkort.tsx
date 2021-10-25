import PreState from '../../onboardingMeldekort/pre-state';

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
            tittel={'Hva slags hjelp kan du forvente fra NAV?'}
        />
    );
}

export default Startkort;
