import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
import { sorterEtterNyesteDatoInnsendt } from '../../../lib/beregn-dagpenge-status';
import { loggAktivitet } from '../../../metrics/metrics';
import { mine_dagpenger_url } from '../../../url';
import { formaterDato, datoForForventetSvar } from '../../../utils/date-utils';
import { usePaabegynteSoknaderData } from '../../../contexts/paabegynte-soknader';
import prettyPrintDato from '../../../utils/pretty-print-dato';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    const soknader = useDpInnsynSoknadData();
    const sisteInnsendteSoknad = soknader?.sort(sorterEtterNyesteDatoInnsendt)[0];
    const paabegynteSoknader = usePaabegynteSoknaderData().soknader;
    const sistePaabegyntSoknad = paabegynteSoknader.sort(
        (a, b) => new Date(b.dato).getTime() - new Date(a.dato).getTime()
    )[0];
    const harPaabegyntEtterInnsendt =
        sistePaabegyntSoknad &&
        new Date(sistePaabegyntSoknad.dato).getTime() > new Date(sisteInnsendteSoknad?.datoInnsendt).getTime();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                {harPaabegyntEtterInnsendt ? 'Søknad om dagpenger og påbegynte søknader' : 'Søknad om dagpenger'}
            </Heading>

            {sisteInnsendteSoknad?.datoInnsendt && (
                <>
                    <BodyShort size="small" className={'blokk-xs'}>
                        Den siste søkaden NAV har mottatt ble sendt inn{' '}
                        {prettyPrintDato(sisteInnsendteSoknad.datoInnsendt)}.
                    </BodyShort>

                    <BodyShort size="small" className={'blokk-xs'}>
                        Du kan forvente svar{' '}
                        {formaterDato(datoForForventetSvar(new Date(sisteInnsendteSoknad.datoInnsendt)))}
                    </BodyShort>
                </>
            )}
            <BodyShort size="small" className={'blokk-xs'}>
                Du kan ettersende dokumentasjon og se mer informasjon via {' '}
                <Link
                    className={'tracking-wide'}
                    href={mine_dagpenger_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til Mine dagpenger fra "dagpenger-tema - har søkt dagpenger"',
                            mine_dagpenger_url
                        )
                    }
                >
                    Mine dagpenger
                </Link>
            </BodyShort>

            {harPaabegyntEtterInnsendt && (
                <BodyShort size="small" className={'blokk-xs'}>
                    Du har også en påbegynt søknad du kan <a href={sistePaabegyntSoknad.lenke}>fortsette på</a>.
                </BodyShort>
            )}

            <BodyShort size="small" className={'blokk-xs'}>
                Har du spørsmål om å søke eller motta dagpenger, må du bruke{' '}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra "dagpenger-tema - har søkt dagpenger"',
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
                            'Går til chat fra "dagpenger-tema - har søkt dagpenger"',
                            'https://www.nav.no/person/kontakt-oss/chat/'
                        )
                    }
                >
                    chat
                </Link>
                .
            </BodyShort>
            <BodyShort size="small" className={'blokk-xs'}>
                Du kan også lese om de ulike ytelsene på{' '}
                <Link
                    href="https://www.nav.no/"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til forsiden fra  "dagpenger-tema - har søkt dagpenger"',
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
