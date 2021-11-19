import { Innholdstittel } from 'nav-frontend-typografi';

import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';

function Startkort() {
    return (
        <>
            <ErRendret loggTekst="Rendrer meldekort pre-state" />
            <Innholdstittel className={'blokk-xs'}>Hvorfor er det viktig å sende meldekort?</Innholdstittel>
            <InViewport loggTekst="Viser meldekort pre-state i viewport" />
        </>
    );
}

export default Startkort;
