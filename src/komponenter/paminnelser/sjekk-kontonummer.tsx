import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { loggAktivitet } from '../../metrics/metrics';
import './paminnelse.less';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { OppfolgingContext } from '../../ducks/oppfolging';

const SjekkKontonummer = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const autentiseringData = React.useContext(AutentiseringContext).data;

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til sjekk kontonummer', ...amplitudeAktivitetsData });
    };

    const kanViseKomponent =
        oppfolgingData.underOppfolging && autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4;

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <div className="wrapper">
            <Panel border className="ramme blokk-s">
                <section className="paminnelse">
                    <div className="innhold">
                        <Systemtittel tag="h2" className="blokk-xs">
                            Sjekk kontonummer
                        </Systemtittel>
                        <Normaltekst className="blokk-xs">
                            For å unngå forsinkelser i utbetalinger og saksbehandling er det viktig å sjekke at du har
                            registrert det rette kontonummeret hos oss.
                        </Normaltekst>
                        <Lenke
                            href="https://www.nav.no/person/personopplysninger/#utbetaling"
                            onClick={handleClick}
                            target="_blank"
                        >
                            Kontroller kontonummer
                        </Lenke>
                    </div>
                </section>
            </Panel>
        </div>
    );
};

export default SjekkKontonummer;
