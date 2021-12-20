import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { loggAktivitet } from '../../../metrics/metrics';
import { mine_dagpenger_url } from '../../../url';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du mottar dagpenger
            </Heading>

            <BodyShort size="small" className={'blokk-xs'}>
                Se mer info på {' '}
                <Link
                    className={'tracking-wide'}
                    href={mine_dagpenger_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til Mine dagpenger fra "dagpenger-tema - mottar dagpenger"',
                            mine_dagpenger_url
                        )
                    }
                >
                    Mine dagpenger
                </Link>
            </BodyShort>

            <BodyShort size="small" className={'blokk-xs'}>
                Har du spørsmål om dagpenger, må du bruke{' '}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra "dagpenger-tema - mottar dagpenger"',
                            'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                        )
                    }
                >
                    skriv til oss
                </Link>{' '}
                eller{' '}
                <Link
                    href="https://www.nav.no/person/kontakt-oss/chat/"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til chat fra "dagpenger-tema - mottar dagpenger"',
                            'https://www.nav.no/person/kontakt-oss/chat/'
                        )
                    }
                >
                    chat
                </Link>
                .
            </BodyShort>

            <BodyShort size="small" className={'blokk-xs'}>
                Du kan lese om de ulike ytelsene på{' '}
                <Link
                    href="https://www.nav.no/"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til forsiden fra  "dagpenger-tema - mottar dagpenger"',
                            'https://www.nav.no/'
                        )
                    }
                >
                    nav.no
                </Link>
            </BodyShort>
        </>
    );
};

export default Sluttkort;
