import { Heading } from '@navikt/ds-react';

import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';

function Startkort() {
    return (
        <>
            <ErRendret loggTekst="Rendrer meldekort pre-state" />
            <Heading size="large" className={'blokk-xs'}>
                Hvorfor er det viktig å sende meldekort?
            </Heading>
            <InViewport loggTekst="Viser meldekort pre-state i viewport" />
        </>
    );
}

export default Startkort;
