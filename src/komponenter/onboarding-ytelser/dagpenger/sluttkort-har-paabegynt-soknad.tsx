import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { loggAktivitet } from '../../../metrics/metrics';
import { saksoversikt_url } from '../../../url';
import TemaLenkepanel from '../../tema/tema-lenkepanel';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <Systemtittel className={'blokk-xs'}>Du har startet på en søknad om dagpenger</Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                Du kan tidligst få dagpenger fra den dagen du har søkt fra.
            </Normaltekst>
            <Normaltekst className={'blokk-xs'}>Du har ikke sendt inn søknaden</Normaltekst>

            <TemaLenkepanel
                href=""
                amplitudeHandling="Fortsetter påbegynt soknad"
                amplitudeTema="dagpenger"
                tittel="Fortsett på påbegynt søknad"
                beskrivelse={`du startet på søknaden ${'dato'}`}
            />

            <Normaltekst className={'blokk-xs'}>
                Se mer info på {' '}
                <Lenke
                    className={'tracking-wide'}
                    href={saksoversikt_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til saksoversikten fra "dagpenger-tema - påbegynt søknad"',
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
                            'Går til STO fra "dagpenger-tema - påbegynt søknad"',
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
                            'Går til chat fra "dagpenger-tema - påbegynt søknad"',
                            'https://www.nav.no/person/kontakt-oss/chat/'
                        )
                    }
                >
                    chat
                </Lenke>
                .
            </Normaltekst>
        </>
    );
};

export default Sluttkort;
