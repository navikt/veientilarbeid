import { useContext } from 'react';
import { Heading, BodyShort, Detail, Link } from '@navikt/ds-react';
import Feedback from '../../feedback/feedback-legacy';
import { OppfolgingContext, Servicegruppe } from '../../../contexts/oppfolging';
import { amplitudeLogger } from '../../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../../contexts/amplitude-context';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Heading level="2" size="medium">
                    Hva slags hjelp kan jeg få?
                </Heading>
                <Detail size="small" className="blokk-xs">
                    1 av 4
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    Vi har gjort en vurdering av svarene dine, og vi tror at du har gode muligheter til å skaffe deg
                    jobb på egenhånd.
                </BodyShort>

                <BodyShort>Vår vurdering er basert på:</BodyShort>
                <ul>
                    <li>dine svar fra registreringen</li>
                    <li>opplysningene NAV har om din situasjon</li>
                </ul>
                <BodyShort>
                    NAV tar som hovedregel ikke kontakt i forbindelse med hjelp til jobbsøking de første 12 ukene etter
                    at du registrerte deg som arbeidssøker.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-01'} />
        </div>
    );
}

function Kort2() {
    const { servicegruppe } = useContext(OppfolgingContext).data;
    const amplitudeData = useAmplitudeData();

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };

    const tittel = servicegruppe === Servicegruppe.IKVAL ? 'Du har mottatt et brev' : 'Du vil motta et brev';

    return (
        <div className="kortflate">
            <div>
                <Heading level="2" size="medium">
                    {tittel}
                </Heading>
                <Detail size="small" className="blokk-xs">
                    2 av 4
                </Detail>
                <BodyShort className={'blokk-xs'}>
                    {servicegruppe === Servicegruppe.IKVAL ? (
                        <>
                            Du har mottatt brevet{' '}
                            <Link onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                                «NAV har vurdert dine muligheter»
                            </Link>
                            .
                        </>
                    ) : (
                        'Du vil i løpet av den første uken motta brevet «NAV har vurdert dine muligheter».'
                    )}
                </BodyShort>
                <BodyShort>Dette brevet er ikke et svar på en eventuell søknad om dagpenger.</BodyShort>
            </div>
            <Feedback id={'Introkort14A-02'} />
        </div>
    );
}

function Kort3() {
    const amplitudeData = useAmplitudeData();

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
                <Heading level="2" size="medium">
                    Hva er en veileder?
                </Heading>
                <Detail size="small" className="blokk-xs">
                    3 av 4
                </Detail>
                <BodyShort className={'blokk-xs'}>
                    En veileder sin oppgave er å besvare spørsmål, bistå rundt det å søke stillinger og tilby hjelp på
                    veien til arbeid.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Veiledere kan <strong>ikke</strong> svare på spørsmål om søknader, behandling av søknader eller
                    utbetalinger av dagpenger.
                </BodyShort>

                <BodyShort>
                    Dersom du lurer på noe om dagpenger ber vi deg bruke{' '}
                    <Link
                        href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til STO fra 14a onboarding kort',
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
                                'Går til Chat fra 14a onboarding kort',
                                'https://www.nav.no/person/kontakt-oss/chat/'
                            )
                        }
                    >
                        chat
                    </Link>
                    .
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-04'} />
        </div>
    );
}

function Kort4() {
    return (
        <div className="kortflate">
            <div>
                <Heading level="2" size="medium">
                    Ta kontakt om du trenger hjelp
                </Heading>
                <Detail size="small" className="blokk-xs">
                    4 av 4
                </Detail>
                <BodyShort className={'blokk-xs'}>Du kan få hjelp fra en veileder før 12 uker har gått.</BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Da må du selv kontakte veileder ved å bruke dialogen som vises på slutten av denne introduksjonen.
                </BodyShort>

                <BodyShort>
                    Du kan gi oss beskjed om at du ønsker hjelp nå med en gang, eller se litt an hvordan du syns
                    jobbsøkingen din går før du tar kontakt.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-03'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />, <Kort4 />];

export default kortliste;
