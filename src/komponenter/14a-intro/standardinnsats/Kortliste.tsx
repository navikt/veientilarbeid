import { useContext } from 'react';
import { Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Feedback from '../../feedback/feedback';
import Lenke from 'nav-frontend-lenker';
import { OppfolgingContext, Servicegruppe } from '../../../ducks/oppfolging';
import { amplitudeLogger } from '../../../metrics/amplitude-utils';
import { AmplitudeContext } from '../../../ducks/amplitude-context';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">1 av 4</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    NAV har gjort en vurdering av svarene dine, og det ser ut til at du har gode muligheter til å skaffe
                    deg jobb på egenhånd.
                </Normaltekst>

                <Normaltekst>Vurderingen baserer seg på:</Normaltekst>
                <ul>
                    <li>
                        <Normaltekst>svarene fra registreringen</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>opplysningene NAV har om din situasjon</Normaltekst>
                    </li>
                </ul>
            </div>
            <Feedback id={'Introkort14A-01'} />
        </div>
    );
}

function Kort2() {
    const { servicegruppe } = useContext(OppfolgingContext).data;
    const amplitudeData = useContext(AmplitudeContext);

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };

    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">2 av 4</Undertekst>
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
                        'Du vil i løpet av den første uken motta brevet «NAV har vurdert dine muligheter».'
                    )}
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Dette brevet er ikke et svar på en eventuell søknad om dagpenger.
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-02'} />
        </div>
    );
}

function Kort3() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">3 av 4</Undertekst>
                <Normaltekst className={'blokk-xs'}>Du kan få hjelp fra en veileder.</Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Da må du selv kontakte veileder ved å bruke dialogen som vises på slutten av denne introduksjonen.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Du kan gi oss beskjed om at du ønsker hjelp nå med en gang, eller se litt an hvordan du syns
                    jobbsøkingen din går før du tar kontakt.
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-03'} />
        </div>
    );
}
function Kort4() {
    const amplitudeData = useContext(AmplitudeContext);

    function loggLenkeKlikk(handling: string, url: string) {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling,
            ...amplitudeData,
        });
        window.location.assign(url);
    }

    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">4 av 4</Undertekst>
                <Normaltekst className={'blokk-xs'}>
                    En veileder sin oppgave er å besvare spørsmål, bistå rundt det å søke stillinger og tilby hjelp på
                    veien til arbeid.
                </Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Veiledere kan <strong>ikke</strong> svare på spørsmål om søknader, behandling av søknader eller
                    utbetalinger av dagpenger.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Dersom du lurer på noe om dagpenger ber vi deg bruke{' '}
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
            <Feedback id={'Introkort14A-04'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />, <Kort4 />];

export default kortliste;
