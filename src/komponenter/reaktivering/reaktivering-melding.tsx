import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { reaktiveringLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { OppfolgingContext } from '../../ducks/oppfolging';

const ReaktiveringMelding = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const kanViseKomponent = isLevel4 && kanReaktiveres;

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
                <Normaltekst className="blokk-xs">
                    Du er ikke lenger registrert som arbeidssøker hos NAV.
                </Normaltekst>
                <Normaltekst className="blokk-xs">
                Har du mottat dagpenger vil utbetalingene nå være stoppet. Du må registrere deg på nytt og sende inn ny dagpengesøknad.
                </Normaltekst>
                <Normaltekst className="blokk-xs">
                    Dersom du ønsker arbeidsrettet oppfølging fra NAV, må du være registrert som arbeidssøker.
                </Normaltekst>
                <Normaltekst className="blokk-xs">
                    Dersom du har søkt eller ønsker å søke om dagpenger må du være registrert som arbeidssøker.
                </Normaltekst>
                <Normaltekst className="blokk-s">
                    <a href={reaktiveringLenke} className="lenke" onClick={handleReaktivering}>
                        Registrer deg som arbeidssøker
                    </a>
                </Normaltekst>
            </AlertStripeAdvarsel>
        </section>
    );
};

export default ReaktiveringMelding;
