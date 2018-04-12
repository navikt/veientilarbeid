import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

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