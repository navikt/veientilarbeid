import * as React from 'react';
import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import './krr-melding.less';
import { difiLenke } from '../../innhold/lenker';

class KrrMelding extends React.Component<{}> {
    render() {
        return (
            <AlertStripeAdvarselSolid className="krr-melding blokk-xs">
                <Normaltekst className="blokk-xs">
                    <FormattedMessage id="krr-melding-ingress"/>
                </Normaltekst>
                <Normaltekst>
                    <FormattedMessage id="krr-melding-kulepunkt-ingress"/>
                </Normaltekst>
                <ul>
                    <li><Normaltekst><FormattedMessage id="krr-melding-kulepunkt1"/></Normaltekst></li>
                    <li><Normaltekst><FormattedMessage id="krr-melding-kulepunkt2"/></Normaltekst></li>
                    <li><Normaltekst><FormattedMessage id="krr-melding-kulepunkt3"/></Normaltekst></li>
                </ul>
                <Lenke href={difiLenke}>
                    <Normaltekst>
                        <FormattedMessage id="krr-melding-lenketekst"/>
                    </Normaltekst>
                </Lenke>
            </AlertStripeAdvarselSolid>
        );
    }
}

export default KrrMelding;


