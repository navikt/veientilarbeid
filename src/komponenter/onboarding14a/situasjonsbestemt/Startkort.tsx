import { Heading } from '@navikt/ds-react';
import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';

function Startkort() {
    return (
        <>
            <ErRendret loggTekst="Rendrer 14a pre-state" />
            <Heading size="large" className={'blokk-xs'}>
                Hva slags hjelp kan jeg få?
            </Heading>
            <InViewport loggTekst="Viser 14a pre-state i viewport" />
        </>
    );
}

export default Startkort;
