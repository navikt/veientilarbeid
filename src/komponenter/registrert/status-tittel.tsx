import { Heading } from '@navikt/ds-react';

import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

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

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <Heading style={{ margin: 'var(--navds-font-size-medium) 0' }} size="medium">
            {tekst('registrert')}
        </Heading>
    );
};

export default StatusTittel;
