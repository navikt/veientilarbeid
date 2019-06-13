import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import './krr-melding.less';
import { difiLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';

class KrrMelding extends React.Component<{}> {
    render() {
        return (
            <AlertStripeAdvarsel className="krr-melding blokk-xs">
                <Normaltekst className="blokk-xs">
                    {tekster['krr-melding-ingress']}
                </Normaltekst>
                <Normaltekst>
                    {tekster['krr-melding-kulepunkt-ingress']}
                </Normaltekst>
                <ul>
                    <li><Normaltekst>{tekster['krr-melding-kulepunkt1']}</Normaltekst></li>
                    <li><Normaltekst>{tekster['krr-melding-kulepunkt2']}</Normaltekst></li>
                    <li><Normaltekst>{tekster['krr-melding-kulepunkt3']}</Normaltekst></li>
                </ul>
                <Lenke href={difiLenke}>
                    <Normaltekst>
                        {tekster['krr-melding-lenketekst']}
                    </Normaltekst>
                </Lenke>
            </AlertStripeAdvarsel>
        );
    }
}

export default KrrMelding;


