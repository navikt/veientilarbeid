import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import { reaktiveringLenke, dialogLenke } from '../../innhold/lenker';
import { loggAktivitet, loggVisning } from '../../metrics/metrics';
import { AmplitudeContext } from '../../context/amplitude-context';
import { AutentiseringContext, InnloggingsNiva } from '../../context/autentisering';
import { OppfolgingContext } from '../../context/oppfolging';
import './reaktivering-melding.less';

const ReaktiveringIkkeAktueltMelding = () => {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const kanViseKomponent = isLevel4 && kanReaktiveres;

    React.useEffect(() => {
        if (kanViseKomponent) {
            loggVisning({ viser: 'Reaktivering ikke aktuelt', ...amplitudeData });
        }
    }, [kanViseKomponent, amplitudeData]);

    const handleReaktivering = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Går til reaktivering fra reaktivering ikke aktuelt', ...amplitudeData });
        window.location.assign(reaktiveringLenke);
    };

    const handleDialog = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Går til dialog fra reaktivering ikke aktuelt', ...amplitudeData });
        window.location.assign(dialogLenke);
    };

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <div>
            <Normaltekst className="blokk-s">
                <Knapp onClick={handleReaktivering}>Registrer deg som arbeidssøker</Knapp>
            </Normaltekst>
            <Normaltekst>
                Er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker?
            </Normaltekst>
            <Normaltekst className="blokk-xs">
                <Lenke href={dialogLenke} onClick={handleDialog}>
                    Ta kontakt med veilederen din i dialogtjenesten
                </Lenke>
            </Normaltekst>
        </div>
    );
};

export default ReaktiveringIkkeAktueltMelding;
