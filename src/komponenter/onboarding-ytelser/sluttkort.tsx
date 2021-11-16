import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <Systemtittel className={'blokk-xs'}>Har du spørsmål om å søke eller motta pengestøtte?</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Du kan stille spørsmål om ytelser via{' '}
                <Lenke
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk('Går til STO fra ytelser-kort', 'https://mininnboks.nav.no/sporsmal/skriv/ARBD')
                    }
                >
                    skriv til oss
                </Lenke>{' '}
                og{' '}
                <Lenke
                    href="https://www.nav.no/person/kontakt-oss/chat/"
                    onClick={() =>
                        loggLenkeKlikk('Går til chat fra ytelser-kort', 'https://www.nav.no/person/kontakt-oss/chat/')
                    }
                >
                    chat
                </Lenke>
                .
            </Normaltekst>
            <Normaltekst className={'blokk-m'}>
                Du kan lese om livssituasjoner NAV kan hjelpe med på{' '}
                <Lenke
                    href="https://www.nav.no/"
                    onClick={() => loggLenkeKlikk('Går til forsiden fra ytelse kort', 'https://www.nav.no/')}
                >
                    forsiden
                </Lenke>
                {' '}av nav.no
            </Normaltekst>
        </>
    );
};

export default Sluttkort;
