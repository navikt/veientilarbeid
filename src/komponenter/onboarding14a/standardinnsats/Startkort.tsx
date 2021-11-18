import { ClockFilled } from '@navikt/ds-icons';
import { Innholdstittel, Undertekst } from 'nav-frontend-typografi';

import InViewport from '../../in-viewport/in-viewport';

function Startkort() {
    return (
        <>
            <Innholdstittel className={'blokk-xs'}>Hva slags hjelp kan jeg få?</Innholdstittel>
            <div className={'lesetid mb-2'}>
                <ClockFilled className={'mr-05'} />
                <Undertekst>3 minutter lesetid</Undertekst>
            </div>
            <InViewport loggTekst="Viser 14a pre-state i viewport" />
        </>
    );
}

export default Startkort;
