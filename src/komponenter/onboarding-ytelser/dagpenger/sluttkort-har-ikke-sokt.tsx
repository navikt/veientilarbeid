import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { loggAktivitet } from '../../../metrics/metrics';
import { dagpengerSoknadLenke } from '../../../innhold/lenker';
import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    const handleButtonClick = () => {
        loggAktivitet({
            aktivitet: 'Går til dagpengesøknad fra "dagpenger-tema - ikke søkt dagpenger"',
            ...amplitudeData,
        });
        window.location.assign(dagpengerSoknadLenke);
    };

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du har ikke sendt inn søknad om dagpenger
            </Heading>

            <BodyShort className={'blokk-xs'}>
                Du kan tidligst få dagpenger fra den dagen du sender inn søknaden.
            </BodyShort>

            <Button variant="primary" onClick={handleButtonClick} className="blokk-xs">
                Søk om dagpenger
            </Button>

            <BodyShort className={'blokk-xs'}>
                Har du spørsmål om dagpenger må du bruke{' '}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra "dagpenger-tema - ikke søkt dagpenger"',
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
                            'Går til chat fra "dagpenger-tema - ikke søkt dagpenger"',
                            'https://www.nav.no/person/kontakt-oss/chat/'
                        )
                    }
                >
                    chat
                </Link>
                .
            </BodyShort>
        </>
    );
};

export default Sluttkort;
