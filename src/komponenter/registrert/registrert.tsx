import InViewport from '../in-viewport/in-viewport';
import Temapanel from '../tema-panel/tema-panel';
import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';

const Registrert = () => {
    const kanViseKomponent = useErInnloggetArbeidssoker();

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <div id="registrering-status-container" className="blokk-s">
            <Temapanel />
            <InViewport loggTekst="Registreringsboks i viewport" />
        </div>
    );
};

export default Registrert;
