import { Heading } from '@navikt/ds-react';

import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { createRef, useCallback, useEffect } from 'react';

const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
    },
    en: {
        registrert: 'You are registered as job seeker',
    },
};

const StatusTittel = () => {
    const kanViseKomponent = useErInnloggetArbeidssoker();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const containerRef = createRef<HTMLDivElement>();

    const scrollToRegistrering = useCallback(() => {
        const goto = new URLSearchParams(window.location.search).get('goTo');
        if (goto === 'registrering' && containerRef.current) {
            containerRef.current.scrollIntoView();
        }
    }, [containerRef]);

    useEffect(() => {
        scrollToRegistrering();
    }, [scrollToRegistrering]);

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <div ref={containerRef}>
            <Heading style={{ margin: 'var(--navds-font-size-medium) 0' }} size="medium">
                {tekst('registrert')}
            </Heading>
        </div>
    );
};

export default StatusTittel;
