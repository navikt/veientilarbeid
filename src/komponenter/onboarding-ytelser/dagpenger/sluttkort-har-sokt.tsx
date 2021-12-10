import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
// import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
// import { sorterEtterNyesteDatoInnsendt } from '../../../lib/beregn-dagpenge-status';
import { loggAktivitet } from '../../../metrics/metrics';
import { saksoversikt_url } from '../../../url';
import { formaterDato, datoForForventetSvar } from '../../../utils/date-utils';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    // const soknader = useDpInnsynSoknadData();
    const siteInnsendteSoknad = {
        søknadId: '2',
        skjemaKode: 'NAV 04-01.03',
        tittel: 'Søknad om dagpenger (ikke permittert)',
        journalpostId: '11',
        søknadsType: 'NySøknad',
        kanal: 'Digital',
        datoInnsendt: '2021-03-21T10:29:09.655',
        vedlegg: [
            {
                skjemaNummer: '123',
                navn: 'navn',
                status: 'LastetOpp',
            },
        ],
    }; // soknader?.soknad.sort(sorterEtterNyesteDatoInnsendt)[0];

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <Systemtittel className={'blokk-xs'}>Dagpenger</Systemtittel>

            {siteInnsendteSoknad?.datoInnsendt && (
                <>
                    <Normaltekst className={'blokk-xs'}>
                        Siste søknad mottatt: {formaterDato(new Date(siteInnsendteSoknad.datoInnsendt))}
                    </Normaltekst>

                    <Normaltekst className={'blokk-xs'}>
                        Du kan forvente svar{' '}
                        {formaterDato(datoForForventetSvar(new Date(siteInnsendteSoknad.datoInnsendt)))}
                    </Normaltekst>
                </>
            )}
            <Normaltekst className={'blokk-xs'}>
                Se mer info på {' '}
                <Lenke
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
                </Lenke>
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Har du spørsmål om å søke eller motta dagpenger, må du bruke
                <Lenke
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra "dagpenger-tema - har søkt dagpenger"',
                            'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                        )
                    }
                >
                    skriv til oss
                </Lenke>{' '}
                eller{' '}
                <Lenke
                    href="https://www.nav.no/person/kontakt-oss/chat/"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til chat fra "dagpenger-tema - har søkt dagpenger"',
                            'https://www.nav.no/person/kontakt-oss/chat/'
                        )
                    }
                >
                    chat
                </Lenke>
                .
            </Normaltekst>
            <Normaltekst className={'blokk-xs'}>
                Du kan også lese om de ulike ytelsene på{' '}
                <Lenke
                    href="https://www.nav.no/"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til forsiden fra  "dagpenger-tema - har søkt dagpenger"',
                            'https://www.nav.no/'
                        )
                    }
                >
                    nav.no
                </Lenke>
            </Normaltekst>
        </>
    );
};

export default Sluttkort;
