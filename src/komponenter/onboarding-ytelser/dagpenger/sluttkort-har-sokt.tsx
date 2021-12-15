import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
import { sorterEtterNyesteDatoInnsendt } from '../../../lib/beregn-dagpenge-status';
import { loggAktivitet } from '../../../metrics/metrics';
import { saksoversikt_url } from '../../../url';
import { formaterDato, datoForForventetSvar } from '../../../utils/date-utils';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    const soknader = useDpInnsynSoknadData();
    const siteInnsendteSoknad = soknader?.sort(sorterEtterNyesteDatoInnsendt)[0];

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Dagpenger
            </Heading>

            {siteInnsendteSoknad?.datoInnsendt && (
                <>
                    <BodyShort size="small" className={'blokk-xs'}>
                        Siste søknad mottatt: {formaterDato(new Date(siteInnsendteSoknad.datoInnsendt))}
                    </BodyShort>

                    <BodyShort size="small" className={'blokk-xs'}>
                        Du kan forvente svar{' '}
                        {formaterDato(datoForForventetSvar(new Date(siteInnsendteSoknad.datoInnsendt)))}
                    </BodyShort>
                </>
            )}
            <BodyShort size="small" className={'blokk-xs'}>
                Se mer info på {' '}
                <Link
                    className={'tracking-wide'}
                    href={saksoversikt_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til saksoversikten fra "dagpenger-tema - har søkt dagpenger"',
                            saksoversikt_url
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
