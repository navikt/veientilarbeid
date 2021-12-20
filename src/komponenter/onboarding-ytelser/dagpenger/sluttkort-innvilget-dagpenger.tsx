import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useDpInnsynVedtakData, Vedtak } from '../../../contexts/dp-innsyn-vedtak';
import { loggAktivitet } from '../../../metrics/metrics';
import { mine_dagpenger_url } from '../../../url';
import prettyPrintDato from '../../../utils/pretty-print-dato';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    const vedtakData = useDpInnsynVedtakData();
    const nyesteInnvilgedeVedtak = vedtakData
        .filter((vedtak) => vedtak.status === 'INNVILGET')
        .sort((a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime())[0];
    if (!nyesteInnvilgedeVedtak) return null;

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du har fått innvilget søknad om dagpenger
            </Heading>

            <BodyShort size="small" className={'blokk-xs'}>
                Dagpenger er innvilget fra {prettyPrintDato(nyesteInnvilgedeVedtak.fraDato)}
            </BodyShort>

            <BodyShort size="small" className={'blokk-xs'}>
                Se mer info på {' '}
                <Link
                    className={'tracking-wide'}
                    href={mine_dagpenger_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til Mine dagpenger fra "dagpenger-tema - dagpenger innvilget"',
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
                            'Går til STO fra "dagpenger-tema - dagpenger innvilget"',
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
                            'Går til chat fra "dagpenger-tema - dagpenger innvilget"',
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
