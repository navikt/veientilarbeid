import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import { reaktiveringLenke, dialogLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { OppfolgingContext } from '../../ducks/oppfolging';
import './reaktivering-melding.less'

const ReaktiveringIkkeAktueltMelding = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const kanViseKomponent = isLevel4 && kanReaktiveres;

    React.useEffect(() => {
        if (kanViseKomponent) {
            loggAktivitet({ aktivitet: 'Viser reaktivering ikke aktuelt', ...amplitudeAktivitetsData });
        }
    }, [kanViseKomponent, amplitudeAktivitetsData]);

    const handleReaktivering = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Går til reaktivering fra reaktivering ikke aktuelt', ...amplitudeAktivitetsData });
        window.location.assign(reaktiveringLenke);
    };

    const handleDialog = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Går til dialog fra reaktivering ikke aktuelt', ...amplitudeAktivitetsData });
        window.location.assign(dialogLenke);
    };

    if (!kanViseKomponent) {
        return null;
    }
    return (
        <section className="reaktivering-melding blokk-s">
          <Ekspanderbartpanel
            tittel={<AlertStripe type="info" form="inline">Du er ikke registrert som arbeidssøker hos NAV.</AlertStripe>}>
            <Normaltekst className="blokk-s">
              <Knapp onClick={handleReaktivering}>
                  Registrer deg som arbeidssøker
              </Knapp>
            </Normaltekst>
            <Normaltekst>
                Er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker?
            </Normaltekst>
            <Normaltekst className="blokk-xs">
                <Lenke
                    href={dialogLenke}
                    onClick={handleDialog}>
                    Ta kontakt med veilederen din i dialogtjenesten
                </Lenke>
            </Normaltekst>
          </Ekspanderbartpanel>
        </section>
    );
};

export default ReaktiveringIkkeAktueltMelding;
