import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { reaktiveringLenke } from '../innhold/lenker';
import tekster from '../tekster/tekster';
import { OppfolgingContext } from '../ducks/oppfolging';

const ReaktiveringMelding = () => {
    const kanReaktiveres = React.useContext(OppfolgingContext).data.kanReaktiveres;

    if (!kanReaktiveres) {
        return null;
    }
    return (
        <section className="reaktivering-melding blokk-m">
            <AlertStripeAdvarsel>
                <Normaltekst>
                    {tekster['reaktivering-melding-tekst']}&ensp;
                    <a href={reaktiveringLenke} className="lenke">
                        {tekster['reaktivering-melding-lenke-tekst']}
                    </a>
                </Normaltekst>
            </AlertStripeAdvarsel>
        </section>
    );
};

export default ReaktiveringMelding;
