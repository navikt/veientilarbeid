import { ClockFilled } from '@navikt/ds-icons';
import { Innholdstittel, Undertekst } from 'nav-frontend-typografi';

import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';

function Startkort() {
    return (
        <>
            <ErRendret loggTekst="Rendrer meldekort pre-state" />
            <Innholdstittel className={'blokk-xs'}>Det viktigste du trenger å vite om meldekort</Innholdstittel>
            <div className={'lesetid mb-2'}>
                <ClockFilled className={'mr-05'} />
                <Undertekst>2 minutter lesetid</Undertekst>
            </div>
            <InViewport loggTekst="Viser meldekort pre-state i viewport" />
        </>
    );
}

export default Startkort;
