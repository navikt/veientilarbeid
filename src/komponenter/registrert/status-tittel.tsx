import { Heading, Panel } from '@navikt/ds-react';

import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { createRef, useCallback, useEffect, useState } from 'react';
import { Success, SuccessColored } from '@navikt/ds-icons';

const TEKSTER = {
    nb: {
        registrert: 'Jeg er registrert som arbeidssøker',
        registrertNy: 'Jeg er nå registrert som arbeidssøker',
    },
    en: {
        registrert: 'I am registered as job seeker',
        registrertNy: 'I am now registered as job seeker',
    },
};

const StatusTittel = () => {
    const kanViseKomponent = useErInnloggetArbeidssoker();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const containerRef = createRef<HTMLDivElement>();
    const [erNyRegistrert, settErNyRegistrert] = useState<boolean>(false);

    const scrollToRegistrering = useCallback(() => {
        const goto = new URLSearchParams(window.location.search).get('goTo');
        if (goto === 'registrering' && containerRef.current) {
            containerRef.current.scrollIntoView();
            settErNyRegistrert(true);
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
            <Panel className="blokk-xs">
                <Heading size="medium">
                    <span style={{ marginRight: '0.5em', position: 'relative', top: '4px' }}>
                        {erNyRegistrert ? <SuccessColored /> : <Success />}
                    </span>
                    {tekst(erNyRegistrert ? 'registrertNy' : 'registrert')}
                </Heading>
            </Panel>
        </div>
    );
};

export default StatusTittel;
