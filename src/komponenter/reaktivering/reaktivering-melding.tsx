import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { reaktiveringLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { loggAktivitet } from '../../metrics/metrics';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const ReaktiveringMelding = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const kanViseKomponent = isLevel4 && kanReaktiveres && !underOppfolging;

    React.useEffect(() => {
        if (kanViseKomponent) {
            loggAktivitet({ aktivitet: 'Viser reaktiveringsmelding', ...amplitudeAktivitetsData });
        }
    }, [kanViseKomponent, amplitudeAktivitetsData]);

    const handleReaktivering = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Går til reaktivering', ...amplitudeAktivitetsData });
        window.location.assign(reaktiveringLenke);
    };

    if (!kanViseKomponent) {
        return null;
    }
    return (
        <section className="reaktivering-melding blokk-m">
            <AlertStripeAdvarsel>
                <Normaltekst>
                    {tekster['reaktivering-melding-tekst']}&ensp;
                    <a href={reaktiveringLenke} className="lenke" onClick={handleReaktivering}>
                        {tekster['reaktivering-melding-lenke-tekst']}
                    </a>
                </Normaltekst>
            </AlertStripeAdvarsel>
        </section>
    );
};

export default ReaktiveringMelding;
