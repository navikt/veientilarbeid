import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import './iarbs-melding.less';
import tekster from '../../tekster/tekster';

class iarbsMelding extends React.Component<{}> {
    render() {
        return (
            <AlertStripeAdvarsel className="iarbs-melding blokk-xs">
                <Normaltekst className="blokk-xs">
                    <strong>{tekster['iarbs-melding-tittel']}</strong>
                </Normaltekst>
                <Normaltekst>
                    {tekster['iarbs-melding-innhold1']}
                </Normaltekst>
                <Normaltekst>
                    {tekster['iarbs-melding-innhold2']}
                </Normaltekst>
            </AlertStripeAdvarsel>
        );
    }
}

export default iarbsMelding;


