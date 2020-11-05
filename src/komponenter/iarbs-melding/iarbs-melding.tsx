import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import './iarbs-melding.less';
import tekster from '../../tekster/tekster';

export interface Props {
    visPlaster: boolean;
}

const iarbsMelding = (props: Props) => {
    const { visPlaster } = props;
    if (!visPlaster) return null;
    return (
        <AlertStripeAdvarsel className="iarbs-melding blokk-xs">
            <Normaltekst className="blokk-xs">
                <strong>{tekster['iarbs-melding-tittel']}</strong>
            </Normaltekst>
            <Normaltekst className="blokk-xs">{tekster['iarbs-melding-innhold1']}</Normaltekst>
            <Normaltekst className="blokk-xs">
                <strong>{tekster['iarbs-melding-innhold2']}</strong>
            </Normaltekst>
            <Normaltekst className="blokk-xs">{tekster['iarbs-melding-tillegg']}</Normaltekst>
        </AlertStripeAdvarsel>
    );
};

export default iarbsMelding;
