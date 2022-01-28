import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { loggAktivitet } from '../../../metrics/metrics';
import { mine_dagpenger_url } from '../../../url';
import PaabegynteSoknader from './paabegynte-soknader';
import { useDpInnsynVedtakData } from '../../../contexts/dp-innsyn-vedtak';
import { sorterEtterNyesteVedtak } from '../../../lib/beregn-dagpenge-status';
import SistInnsendtSoknad from './sist-innsendt-soknad';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();
    const dagpengeVedtak = useDpInnsynVedtakData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    const sisteVedtak = dagpengeVedtak.sort(sorterEtterNyesteVedtak)[0];

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du mottar dagpenger
            </Heading>

            <BodyShort className={'blokk-xs'}>
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
            <SistInnsendtSoknad dato={sisteVedtak?.datoFattet} komponent="mottar" />
            <PaabegynteSoknader dato={sisteVedtak?.datoFattet} komponent="mottar" />
            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - mottar dagpenger"' />

            <BodyShort className={'blokk-xs'}>
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
