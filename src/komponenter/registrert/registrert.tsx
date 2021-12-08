import { createRef, useCallback, useEffect } from 'react';
import InViewport from '../in-viewport/in-viewport';
import Temapanel from '../tema-panel/tema-panel';
import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';

const Registrert = () => {
    const containerRef = createRef<HTMLDivElement>();
    const kanViseKomponent = useErInnloggetArbeidssoker();

    const scrollToRegistrering = useCallback(() => {
        const goto = new URLSearchParams(window.location.search).get('goTo');
        if (goto === 'registrering' && containerRef.current) {
            containerRef.current.scrollIntoView({ block: 'end', inline: 'nearest' });
        }
    }, [containerRef]);

    useEffect(() => {
        scrollToRegistrering();
    }, [scrollToRegistrering]);

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <div id="registrering-status-container" ref={containerRef} className="blokk-s">
            <Temapanel />
            <InViewport loggTekst="Registreringsboks i viewport" />
        </div>
    );
};

export default Registrert;
