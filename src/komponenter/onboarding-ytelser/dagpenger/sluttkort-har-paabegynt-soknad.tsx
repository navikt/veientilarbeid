import { Heading, BodyShort, Link } from '@navikt/ds-react';

import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { usePaabegynteSoknaderData, Soknad } from '../../../contexts/paabegynte-soknader';
import { loggAktivitet } from '../../../metrics/metrics';
import { mine_dagpenger_url } from '../../../url';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import TemaLenkepanel from '../../tema/tema-lenkepanel';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();
    const pabegynteSoknaderData = usePaabegynteSoknaderData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    const sistePabegynteSoknad = pabegynteSoknaderData.soknader.sort(
        (a: Soknad, b: Soknad) => new Date(b.dato).getTime() - new Date(a.dato).getTime()
    )[0];

    if (!sistePabegynteSoknad) return null;

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du har startet på en søknad om dagpenger
            </Heading>

            <BodyShort className={'blokk-xs'}>Du kan tidligst få dagpenger fra den dagen du har søkt.</BodyShort>
            <BodyShort className={'blokk-xs'}>Du har ikke sendt inn søknaden.</BodyShort>

            <TemaLenkepanel
                href={sistePabegynteSoknad.lenke}
                amplitudeHandling="Fortsetter påbegynt soknad"
                amplitudeTema="dagpenger"
                tittel="Fortsett på søknad"
                beskrivelse={`Påbegynt ${prettyPrintDato(sistePabegynteSoknad.dato)}`}
            />

            <BodyShort className={'blokk-xs'}>
                Se mer info på {' '}
                <Link
                    className={'tracking-wide'}
                    href={mine_dagpenger_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til Mine dagpenger fra "dagpenger-tema - påbegynt søknad"',
                            mine_dagpenger_url
                        )
                    }
                >
                    Mine dagpenger
                </Link>
            </BodyShort>

            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - påbegynt søknad"' />
        </>
    );
};

export default Sluttkort;
