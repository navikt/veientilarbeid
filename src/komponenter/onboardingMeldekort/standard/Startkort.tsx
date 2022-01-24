import { Heading } from '@navikt/ds-react';

import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';
import lagHentTekstForSprak from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

const TEKSTER = {
    nb: {
        heading: 'Hvorfor er det viktig å sende meldekort?',
    },
    en: {
        heading: 'What is an employment status form?',
    },
};
function Startkort() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <ErRendret loggTekst="Rendrer meldekort pre-state" />
            <Heading size="large" className={'blokk-xs'}>
                {tekst('heading')}
            </Heading>
            <InViewport loggTekst="Viser meldekort pre-state i viewport" />
        </>
    );
}

export default Startkort;
