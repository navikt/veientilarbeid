import { ClockFilled } from '@navikt/ds-icons';
import { Innholdstittel, Undertekst } from 'nav-frontend-typografi';

function Startkort() {
    return (
        <>
            <Innholdstittel className={'blokk-xs'}>Det viktigste du trenger å vite om meldekort</Innholdstittel>
            <div className={'lesetid mb-2'}>
                <ClockFilled className={'mr-05'} />
                <Undertekst>2 minutter lesetid</Undertekst>
            </div>
        </>
    );
}

export default Startkort;
