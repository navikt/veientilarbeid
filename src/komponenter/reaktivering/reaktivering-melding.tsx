import * as React from 'react';
import handleViewport from 'react-in-viewport';
import { reaktiveringLenke, dialogLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useAutentiseringData, InnloggingsNiva } from '../../contexts/autentisering';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { BodyShort, Button, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

interface ViewportProps {
    inViewport: boolean;
    forwardedRef: React.ForwardedRef<any>;
}

type Props = {
    setReaktivering: (reaktivering: any) => void;
};

const ReaktiveringMelding = (props: Props & ViewportProps): JSX.Element | null => {
    const amplitudeData = useAmplitudeData();
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = useAutentiseringData();

    const [harVistTilBruker, setHarVistTilBruker] = React.useState<boolean>(false);

    const { setReaktivering } = props;
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
            <BodyShort className={spacingStyles.blokkXs}>
                Har du mottatt dagpenger vil utbetalingene nå være stoppet. Du må registrere deg på nytt og sende inn ny
                søknad om dagpenger.
            </BodyShort>
            <BodyShort className={spacingStyles.blokkXs}>
                Dersom du har søkt eller ønsker å søke om dagpenger må du være registrert som arbeidssøker.
            </BodyShort>
            <BodyShort className={spacingStyles.blokkXs}>
                Dersom du ønsker arbeidsrettet oppfølging fra NAV, må du være registrert som arbeidssøker.
            </BodyShort>
            <BodyShort className={spacingStyles.blokkS}>
                <Button variant="secondary" onClick={handleReaktivering}>
                    Registrer deg som arbeidssøker
                </Button>
            </BodyShort>
            <BodyShort>Er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker?</BodyShort>
            <BodyShort className={spacingStyles.blokkXs}>
                <Link href={dialogLenke} onClick={handleDialog}>
                    Ta kontakt med veilederen din i dialogtjenesten
                </Link>
            </BodyShort>
            <BodyShort className={spacingStyles.blokkXs}>
                <Link href={dialogLenke} onClick={handleIkkeReaktivering}>
                    Jeg har ikke lenger behov for å være registrert som arbeidssøker hos NAV
                </Link>
            </BodyShort>
        </div>
    );
};

const ViewportBlock: React.ComponentType<Props> = handleViewport(ReaktiveringMelding);

export default ViewportBlock;
