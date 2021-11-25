import { Knapp } from 'nav-frontend-knapper';
// import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { dagpengerStartSoknadLenke } from '../../../innhold/lenker';
import { loggAktivitet } from '../../../metrics/metrics';

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();

    // function handleIkkeSokeNaa(event: React.SyntheticEvent) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     loggAktivitet({ aktivitet: 'Skal ikke søke dagpenger nå etter reaktivering', ...amplitudeData });
    // }

    function handleSokGjenopptak(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(dagpengerStartSoknadLenke);
        loggAktivitet({ aktivitet: 'Går til dagpengesøknad etter reaktivering', ...amplitudeData });
    }

    return (
        <>
            <Systemtittel>Du må søke om dagpenger på nytt</Systemtittel>

            <div>
                <Normaltekst className="blokk">
                    Har du mottatt dagpenger vil utbetalingene være stoppet og du må derfor sende inn ny søknad.
                </Normaltekst>
                <Normaltekst className="blokk">
                    Du kan tidligst få dagpenger igjen fra den dagen du sender søknaden.
                </Normaltekst>
                <Knapp onClick={handleSokGjenopptak} className="blokk-s">
                    Søk dagpenger
                </Knapp>
                {/* <Normaltekst>
                    <Lenke className="tracking-wide" href="" onClick={handleIkkeSokeNaa}>
                        Skal ikke søke dagpenger nå
                    </Lenke>
                </Normaltekst> */}
            </div>
        </>
    );
};

export default Sluttkort;
