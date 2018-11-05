import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

import './feilmelding.less';

interface FeilmeldingProps {
    tekstId: string;
}

function Feilmelding({tekstId}: FeilmeldingProps) {
    return (
            <AlertStripeAdvarsel className="feilmelding-container">
                <Normaltekst><FormattedMessage id={tekstId}/></Normaltekst>
            </AlertStripeAdvarsel>
    );
}

export default Feilmelding;
