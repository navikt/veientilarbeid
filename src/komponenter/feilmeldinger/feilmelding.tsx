import { Alert, BodyShort } from '@navikt/ds-react';

import tekster from '../../tekster/tekster';

interface FeilmeldingProps {
    tekstId: string;
}

function Feilmelding({ tekstId }: FeilmeldingProps) {
    return (
        <Alert variant="error" style={{ marginTop: '2rem' }}>
            <BodyShort>{tekster[tekstId]}</BodyShort>
        </Alert>
    );
}

export default Feilmelding;
