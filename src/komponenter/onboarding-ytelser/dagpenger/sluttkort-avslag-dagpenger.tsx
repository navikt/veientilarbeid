import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useDpInnsynVedtakData, Vedtak } from '../../../contexts/dp-innsyn-vedtak';
import { loggAktivitet } from '../../../metrics/metrics';
import { mine_dagpenger_url } from '../../../url';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    const vedtakData = useDpInnsynVedtakData();
    const nyesteVedtakMedAvslag = vedtakData
        .filter((vedtak) => vedtak.status === 'AVSLÅTT')
        .sort((a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime())[0];
    if (!nyesteVedtakMedAvslag) return null;

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du har fått et vedtak om dagpenger
            </Heading>

            <BodyShort className={'blokk-xs'}>
                Vedtaket ble fattet {prettyPrintDato(nyesteVedtakMedAvslag.datoFattet)} og status er{' '}
                <b>{nyesteVedtakMedAvslag.status.toLocaleLowerCase()}</b>.
            </BodyShort>

            <BodyShort className={'blokk-xs'}>
                Se mer info på {' '}
                <Link
                    className={'tracking-wide'}
                    href={mine_dagpenger_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til Mine dagpenger fra "dagpenger-tema - dagpenger avslått"',
                            mine_dagpenger_url
                        )
                    }
                >
                    Mine dagpenger
                </Link>
            </BodyShort>

            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - dagpenger avslått"' />

            <BodyShort className={'blokk-xs'}>
                Du kan også lese om de ulike ytelsene på{' '}
                <Link
                    href="https://www.nav.no/"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til forsiden fra  "dagpenger-tema - dagpenger avslått"',
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
