import { useContext } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { AmplitudeContext } from '../../context/amplitude-context';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import ErRendret from '../er-rendret/er-rendret';
import './registrert.less';

interface Props {
    visRegistrertSomPermittert: boolean;
}

function Permittert(props: Props) {
    const amplitudeData = useContext(AmplitudeContext);
    const { visRegistrertSomPermittert } = props;

    const handleLesEndretSituasjon = () => {
        amplitudeLogger('veientilarbeid.aktivitet', {
            handling: 'Går til STO for endret situasjon fra registrert som permittert',
            ...amplitudeData,
        });
    };

    const handleLesDagpenger = () => {
        amplitudeLogger('veientilarbeid.aktivitet', {
            handling: 'Går til les om dagpenger og permittering fra registrert som permittert',
            ...amplitudeData,
        });
    };

    if (!visRegistrertSomPermittert) return null;
    return (
        <div className="permittert-blokk">
            <Normaltekst>
                Ha tett kontakt med arbeidsgiveren din om situasjonen fremover, nå når du er permittert.
            </Normaltekst>
            <Normaltekst>
                Når du har begynt i jobben din igjen, eller mister jobben, så{' '}
                <Lenke onClick={handleLesEndretSituasjon} href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">
                    må du gi beskjed til NAV
                </Lenke>
                .
            </Normaltekst>
            <Normaltekst>
                Du finner{' '}
                <Lenke onClick={handleLesDagpenger} href="https://www.nav.no/arbeid/no/permittert">
                    informasjon om dagpenger og permittering her
                </Lenke>
                .
            </Normaltekst>
            <ErRendret loggTekst="Rendrer registrert som permittert boks" />
        </div>
    );
}

export default Permittert;
