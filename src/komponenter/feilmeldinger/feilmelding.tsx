import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import './feilmelding.less';

interface FeilmeldingProps {
    tekstId: string;
}

function Feilmelding({tekstId}: FeilmeldingProps) {
    return (
            <AlertStripeFeil className="feilmelding-container">
                <Normaltekst><FormattedMessage id={tekstId}/></Normaltekst>
            </AlertStripeFeil>
    );
}

export default Feilmelding;
