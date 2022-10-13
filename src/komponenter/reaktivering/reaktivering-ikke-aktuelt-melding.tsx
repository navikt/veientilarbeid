import * as React from 'react';
import { reaktiveringLenke, dialogLenke } from '../../innhold/lenker';
import { loggAktivitet, loggVisning } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useAutentiseringData, InnloggingsNiva } from '../../contexts/autentisering';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { BodyShort, Button, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

const ReaktiveringIkkeAktueltMelding = () => {
    const { amplitudeData } = useAmplitudeData();
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = useAutentiseringData();
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
        </div>
    );
};

export default ReaktiveringIkkeAktueltMelding;
