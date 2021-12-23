import { Alert, BodyShort } from '@navikt/ds-react';

import './feilmelding.less';
import tekster from '../../tekster/tekster';

interface FeilmeldingProps {
    tekstId: string;
}

function Feilmelding({ tekstId }: FeilmeldingProps) {
    return (
        <Alert variant="error" className="feilmelding-container">
            <BodyShort>{tekster[tekstId]}</BodyShort>
        </Alert>
    );
}

export default Feilmelding;
