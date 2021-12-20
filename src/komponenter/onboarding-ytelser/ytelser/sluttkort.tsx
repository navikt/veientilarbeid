import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { loggAktivitet } from '../../../metrics/metrics';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Har du spørsmål om å søke eller motta pengestøtte?
            </Heading>
            <BodyShort className={'blokk-xs'}>
                Du kan stille spørsmål om ytelser via{' '}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk('Går til STO fra ytelser-kort', 'https://mininnboks.nav.no/sporsmal/skriv/ARBD')
                    }
                >
                    skriv til oss
                </Link>{' '}
                og{' '}
                <Link
                    href="https://www.nav.no/person/kontakt-oss/chat/"
                    onClick={() =>
                        loggLenkeKlikk('Går til chat fra ytelser-kort', 'https://www.nav.no/person/kontakt-oss/chat/')
                    }
                >
                    chat
                </Link>
                .
            </BodyShort>
            <BodyShort className={'blokk-m'}>
                Du kan lese om livssituasjoner NAV kan hjelpe med på{' '}
                <Link
                    href="https://www.nav.no/"
                    onClick={() => loggLenkeKlikk('Går til forsiden fra ytelse kort', 'https://www.nav.no/')}
                >
                    forsiden
                </Link>
                {' '}av nav.no
            </BodyShort>
        </>
    );
};

export default Sluttkort;
