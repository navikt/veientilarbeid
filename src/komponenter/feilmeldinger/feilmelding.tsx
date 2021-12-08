import { Normaltekst } from 'nav-frontend-typografi';
import { Alert } from '@navikt/ds-react';

import './feilmelding.less';
import tekster from '../../tekster/tekster';

interface FeilmeldingProps {
    tekstId: string;
}

function Feilmelding({ tekstId }: FeilmeldingProps) {
    return (
        <Alert variant="error" className="feilmelding-container">
            <Normaltekst>{tekster[tekstId]}</Normaltekst>
        </Alert>
    );
}

export default Feilmelding;
