import { Innholdstittel } from 'nav-frontend-typografi';

import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';

function Startkort() {
    return (
        <>
            <ErRendret loggTekst="Rendrer 14a pre-state" />
            <Innholdstittel className={'blokk-xs'}>Hva slags hjelp kan jeg få?</Innholdstittel>
            <InViewport loggTekst="Viser 14a pre-state i viewport" />
        </>
    );
}

export default Startkort;
