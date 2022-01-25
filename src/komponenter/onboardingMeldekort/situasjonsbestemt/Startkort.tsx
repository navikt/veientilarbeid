import { Heading } from '@navikt/ds-react';
import lagHentTekstForSprak from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

const TEKSTER = {
    nb: {
        heading: 'Det viktigste du trenger å vite om meldekort',
    },
    en: {
        heading: 'Employment status form at a glance',
    },
};
function Startkort() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <Heading size="large" className="blokk-xs">
            {tekst('heading')}
        </Heading>
    );
}

export default Startkort;
