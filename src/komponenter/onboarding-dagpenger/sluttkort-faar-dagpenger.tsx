import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import { saksoversikt_url } from '../../url';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <Systemtittel className={'blokk-xs'}>Du har sendt inn en søknad om dagpenger</Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                Du kan tidligst få dagpenger fra den dagen du sender inn søknaden.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Se mer info på {' '}
                <Lenke
                    className={'tracking-wide'}
                    href={saksoversikt_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til saksoversikten fra "dagpenger-tema - mottar dagpenger"',
                            saksoversikt_url
                        )
                    }
                >
                    Mine dagpenger
                </Lenke>
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Har du spørsmål om å søke eller motta dagpenger, må du bruke{' '}
                <Lenke
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra "dagpenger-tema - mottar dagpenger"',
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
                            'Går til chat fra "dagpenger-tema - mottar dagpenger"',
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
                            'Går til forsiden fra  "dagpenger-tema - mottar dagpenger"',
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
