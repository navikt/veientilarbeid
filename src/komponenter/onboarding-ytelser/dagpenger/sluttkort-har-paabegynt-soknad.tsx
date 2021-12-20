import { Heading, BodyShort, Link } from '@navikt/ds-react';

import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { usePaabegynteSoknaderData, Soknad } from '../../../contexts/paabegynte-soknader';
import { loggAktivitet } from '../../../metrics/metrics';
import { mine_dagpenger_url } from '../../../url';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import TemaLenkepanel from '../../tema/tema-lenkepanel';

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

            <BodyShort size="small" className={'blokk-xs'}>
                Du kan tidligst få dagpenger fra den dagen du har søkt.
            </BodyShort>
            <BodyShort size="small" className={'blokk-xs'}>
                Du har ikke sendt inn søknaden.
            </BodyShort>

            <TemaLenkepanel
                href={sistePabegynteSoknad.lenke}
                amplitudeHandling="Fortsetter påbegynt soknad"
                amplitudeTema="dagpenger"
                tittel="Fortsett på søknad"
                beskrivelse={`Påbegynt ${prettyPrintDato(sistePabegynteSoknad.dato)}`}
            />

            <BodyShort size="small" className={'blokk-xs'}>
                Se mer info på {' '}
                <Link
                    className={'tracking-wide'}
                    href={mine_dagpenger_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til saksoversikten fra "dagpenger-tema - påbegynt søknad"',
                            mine_dagpenger_url
                        )
                    }
                >
                    Mine dagpenger
                </Link>
            </BodyShort>

            <BodyShort size="small" className={'blokk-xs'}>
                Har du spørsmål om å søke eller motta dagpenger, må du bruke{' '}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra "dagpenger-tema - påbegynt søknad"',
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
                            'Går til chat fra "dagpenger-tema - påbegynt søknad"',
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
