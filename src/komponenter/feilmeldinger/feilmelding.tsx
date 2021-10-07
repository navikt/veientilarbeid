import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import './feilmelding.less';
import tekster from '../../tekster/tekster';

interface FeilmeldingProps {
    tekstId: string;
}

function Feilmelding({ tekstId }: FeilmeldingProps) {
    return (
        <AlertStripeFeil className="feilmelding-container">
            <Normaltekst>{tekster[tekstId]}</Normaltekst>
        </AlertStripeFeil>
    );
}

export default Feilmelding;
