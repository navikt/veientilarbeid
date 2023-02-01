import { BodyShort, Link } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { AmplitudeData } from '../../metrics/amplitude-utils';
import { loggAktivitet } from '../../metrics/metrics';

import spacingStyles from '../../spacing.module.css';

interface Props {
    amplitudeData: AmplitudeData;
}

function Innhold(props: Props) {
    const { amplitudeData } = props;

    function loggLenkeKlikk(handling: string, url: string) {
        loggAktivitet({ ...amplitudeData, aktivitet: handling });
        window.location.assign(url);
    }

    function SkrivTilOss() {
        return (
            <Link
                href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                onClick={() =>
                    loggLenkeKlikk('Går til STO fra behovsvurdering', 'https://mininnboks.nav.no/sporsmal/skriv/ARBD')
                }
            >
                skriv til oss
            </Link>
        );
    }

    function Chat() {
        return (
            <Link
                href="https://www.nav.no/person/kontakt-oss/chat/"
                onClick={() =>
                    loggLenkeKlikk('Går til Chat fra behovsvurdering', 'https://www.nav.no/person/kontakt-oss/chat/')
                }
            >
                chat
            </Link>
        );
    }

    function Saksbehandlingstider() {
        return (
            <Link
                href="https://www.nav.no/saksbehandlingstider#dagpenger"
                onClick={() =>
                    loggLenkeKlikk(
                        'Går til saksbehandlingstider fra behovsvurdering',
                        'https://www.nav.no/saksbehandlingstider#dagpenger'
                    )
                }
            >
                Saksbehandlingstider
            </Link>
        );
    }

    return (
        <>
            <BodyShort className={spacingStyles.mb1}>
                Har du spørsmål om dagpenger eller meldekort må du bruke <SkrivTilOss /> eller <Chat />.
            </BodyShort>
            <BodyShort className={spacingStyles.mb1}>
                <Saksbehandlingstider /> finner du en oversikt over på nav.no.
            </BodyShort>
        </>
    );
}

function STOogChat() {
    const { amplitudeData } = useAmplitudeData();

    return <Innhold amplitudeData={amplitudeData} />;
}

export default STOogChat;
