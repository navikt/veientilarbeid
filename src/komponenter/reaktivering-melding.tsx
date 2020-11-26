import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { reaktiveringLenke } from '../innhold/lenker';
import tekster from '../tekster/tekster';
import { loggAktivitet } from '../metrics/metrics';
import { AmplitudeAktivitetContext } from '../ducks/amplitude-aktivitet-context';
import { OppfolgingContext } from '../ducks/oppfolging';

const ReaktiveringMelding = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const kanViseKomponent = kanReaktiveres;

    React.useEffect(() => {
        if (kanViseKomponent) {
            loggAktivitet({ aktivitet: 'Viser reaktiveringsmelding', ...amplitudeAktivitetsData });
        }
    }, [kanViseKomponent, amplitudeAktivitetsData]);

    if (!kanViseKomponent) {
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
