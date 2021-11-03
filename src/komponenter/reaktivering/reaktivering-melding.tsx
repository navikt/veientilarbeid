import * as React from 'react';
import handleViewport from 'react-in-viewport';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import { reaktiveringLenke, dialogLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { AutentiseringContext, InnloggingsNiva } from '../../contexts/autentisering';
import { OppfolgingContext } from '../../contexts/oppfolging';
import './reaktivering-melding.less';

interface ViewportProps {
    inViewport: boolean;
    forwardedRef: React.ForwardedRef<any>;
}

type Props = {
    setReaktivering: (reaktivering: any) => void;
    setApen: (apen: boolean) => void;
};

const ReaktiveringMelding = (props: Props & ViewportProps) => {
    const amplitudeData = useAmplitudeData();
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = React.useContext(AutentiseringContext).data;

    const [harVistTilBruker, setHarVistTilBruker] = React.useState<boolean>(false);

    const { setReaktivering, setApen } = props;
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const kanViseKomponent = isLevel4 && kanReaktiveres;

    if (props.inViewport && !harVistTilBruker) {
        setHarVistTilBruker(true);
    }

    const handleReaktivering = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Går til reaktivering', ...amplitudeData });
        window.location.assign(reaktiveringLenke);
    };

    const handleDialog = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Går til dialog fra reaktiveringskortet', ...amplitudeData });
        window.location.assign(dialogLenke);
    };

    const handleIkkeReaktivering = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Velger ikke vis reaktivering', ...amplitudeData });
        setApen(false);
        setTimeout(() => {
            setReaktivering({
                updated: new Date(),
                state: false,
            });
        }, 500);
    };

    if (!kanViseKomponent) {
        return null;
    }
    return (
        <div ref={props.forwardedRef}>
            <Normaltekst className="blokk-xs">
                Har du mottatt dagpenger vil utbetalingene nå være stoppet. Du må registrere deg på nytt og sende inn ny
                søknad om dagpenger.
            </Normaltekst>
            <Normaltekst className="blokk-xs">
                Dersom du har søkt eller ønsker å søke om dagpenger må du være registrert som arbeidssøker.
            </Normaltekst>
            <Normaltekst className="blokk-xs">
                Dersom du ønsker arbeidsrettet oppfølging fra NAV, må du være registrert som arbeidssøker.
            </Normaltekst>
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
            <Normaltekst className="blokk-xs">
                <Lenke href={dialogLenke} onClick={handleIkkeReaktivering}>
                    Jeg har ikke lenger behov for å være registrert som arbeidssøker hos NAV
                </Lenke>
            </Normaltekst>
        </div>
    );
};

const ViewportBlock: React.ComponentType<Props> = handleViewport(ReaktiveringMelding);

export default ViewportBlock;
