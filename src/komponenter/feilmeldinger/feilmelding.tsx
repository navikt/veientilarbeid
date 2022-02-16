import { Alert, BodyShort } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        feilmelding: 'På grunn av en feil er ikke tjenesten tilgjengelig akkurat nå. Vennligst prøv igjen senere',
    },
};

function Feilmelding() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <Alert variant="error" style={{ marginTop: '2rem' }}>
            <BodyShort>{tekst('feilmelding')}</BodyShort>
        </Alert>
    );
}

export default Feilmelding;
