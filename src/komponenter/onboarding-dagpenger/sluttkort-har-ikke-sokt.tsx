import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import TemaLenkepanel from '../tema/tema-lenkepanel';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import { Hovedknapp } from 'nav-frontend-knapper';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    const handleButtonClick = () => {
        loggAktivitet({
            aktivitet: 'Går til dagpengesøknad fra "dagpenger-tema - ikke søkt dagpenger"',
            ...amplitudeData,
        });
        window.location.assign(dagpengerSoknadLenke);
    };

    return (
        <>
            <Systemtittel className={'blokk-xs'}>Du har ikke sendt inn søknad om dagpenger</Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                Du kan tidligst få dagpenger fra den dagen du sender inn søknaden.
            </Normaltekst>

            <Hovedknapp onClick={handleButtonClick} className="blokk-xs">
                Søk om dagpenger
            </Hovedknapp>

            <TemaLenkepanel href={dagpengerSoknadLenke}> Søk om dagpenger</TemaLenkepanel>
            <Normaltekst className={'blokk-xs'}>
                Har du spørsmål om dagpenger må du bruke
                <Lenke
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra "dagpenger-tema - ikke søkt dagpenger"',
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
                            'Går til chat fra "dagpenger-tema - ikke søkt dagpenger"',
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
