import { useContext } from 'react';
import { Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Feedback from '../../feedback/feedback';
import Lenke from 'nav-frontend-lenker';
import { OppfolgingContext, Servicegruppe } from '../../../ducks/oppfolging';
import { amplitudeLogger } from '../../../metrics/amplitude-utils';
import { AmplitudeContext } from '../../../ducks/amplitude-context';

function Kort1() {
    const { servicegruppe } = useContext(OppfolgingContext).data;
    const amplitudeData = useContext(AmplitudeContext);

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            brukergruppe: 'Standard innsats',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan du forvente å få?</Systemtittel>
                <Undertekst className="blokk-xs">1 av 3</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    {servicegruppe === Servicegruppe.IKVAL ? (
                        <>
                            Du har mottatt brevet{' '}
                            <Lenke onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                                «NAV har vurdert dine muligheter»
                            </Lenke>
                            .
                        </>
                    ) : (
                        'Du vil i løpet av den første uken motta brevet «NAV har vurdert dine muligheter» som vil fortelle deg hva slags oppfølging du kan få fra NAV.'
                    )}
                </Normaltekst>

                <Normaltekst>Dette brevet er ikke et svar på en eventuell søknad om dagpenger.</Normaltekst>
            </div>
            <Feedback id={'Introkort14A-01-ikke-standard'} />
        </div>
    );
}
function Kort2() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">2 av 3</Undertekst>
                <Normaltekst className={'blokk-xs'}>Du kan få hjelp fra en veileder.</Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    En veileder sin oppgave er å besvare spørsmål, bistå rundt det å søke stillinger og tilby hjelp på
                    veien til arbeid.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Veilederen vil også finne ut mer om din situasjon slik at vi bedre kan hjelpe deg videre.
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-02-ikke-standard'} />
        </div>
    );
}

function Kort3() {
    const amplitudeData = useContext(AmplitudeContext);

    function loggLenkeKlikk(handling: string, url: string) {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            brukergruppe: 'Standard innsats',
            handling,
            ...amplitudeData,
        });
        window.location.assign(url);
    }
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan du forvente å få?</Systemtittel>
                <Undertekst className="blokk-xs">3 av 3</Undertekst>

                <Normaltekst className={'blokk-m'}>
                    Veiledere kan ikke svare på spørsmål om søknader, behandling av søknader eller utbetalinger av
                    dagpenger.
                </Normaltekst>
                <Normaltekst className={'blokk-m'}>
                    Har du spørsmål om dagpenger, eller andre søknader må du bruke{' '}
                    <Lenke
                        href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til STO fra 14a onboarding kort',
                                'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                            )
                        }
                    >
                        «Skriv til oss»
                    </Lenke>{' '}
                    eller{' '}
                    <Lenke
                        href="https://www.nav.no/person/kontakt-oss/chat/"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til Chat fra 14a onboarding kort',
                                'https://www.nav.no/person/kontakt-oss/chat/'
                            )
                        }
                    >
                        «Chat»
                    </Lenke>
                    .
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-03-ikke-standard'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />];

export default kortliste;
