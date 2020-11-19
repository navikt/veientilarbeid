import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import './iarbs-melding.less';
import tekster from '../../tekster/tekster';
import { seIARBSPlaster } from '../../metrics/metrics';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { BrukerInfoContext } from '../../ducks/bruker-info';

const IarbsMelding = () => {
    const visPlaster = false; // formidlingsgruppe === Formidlingsgruppe.IARBS && registreringType === RegistreringType.ALLEREDE_REGISTRERT && rettighetsgruppe !== 'AAP';
    const { formidlingsgruppe, servicegruppe } = React.useContext(OppfolgingContext).data;
    const { rettighetsgruppe } = React.useContext(BrukerInfoContext).data;

    if (!visPlaster) return null;

    seIARBSPlaster(formidlingsgruppe, servicegruppe, rettighetsgruppe);

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

export default IarbsMelding;
