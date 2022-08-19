import { useContext } from 'react';
import Feedback from '../../feedback/feedback-legacy';
import { OppfolgingContext, Servicegruppe } from '../../../contexts/oppfolging';
import { amplitudeLogger } from '../../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { BodyShort, Detail, Heading, Link } from '@navikt/ds-react';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">Hva slags hjelp kan jeg få?</Heading>
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
            </div>
            <Feedback id={'Introkort14A-01-standard'} />
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
                <Heading size="medium">{tittel}</Heading>
                <Detail size="small" className="blokk-xs">
                    2 av 4
                </Detail>
                <BodyShort className={'blokk-xs'}>
                    {servicegruppe === Servicegruppe.IKVAL ? (
                        <>
                            <Link onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                                Brevet
                            </Link>{' '}
                            inneholder vår vurdering av dine muligheter til å skaffe deg jobb på egenhånd.
                        </>
                    ) : (
                        'Brevet inneholder vår vurdering av dine muligheter til å skaffe deg jobb på egenhånd.'
                    )}
                </BodyShort>

                <BodyShort className={'blokk-m'}>
                    Dette brevet er ikke et svar på en eventuell søknad om dagpenger.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-02-standard'} />
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
                <Heading size="medium">Hva er en veileder?</Heading>
                <Detail size="small" className="blokk-xs">
                    3 av 4
                </Detail>
                <BodyShort className={'blokk-xs'}>
                    Veilederens oppgave er å besvare spørsmål, bistå deg med å søke stillinger og tilby deg hjelp på
                    veien til arbeid.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Veilederne kan <strong>ikke</strong> svare på spørsmål om søknad om dagpenger, behandling av
                    dagpengesøknaden eller utbetaling av dagpenger.
                </BodyShort>

                <BodyShort className={'blokk-m'}>
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
            <Feedback id={'Introkort14A-03-standard'} />
        </div>
    );
}

function Kort4() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">Ta kontakt om du trenger hjelp</Heading>
                <Detail size="small" className="blokk-xs">
                    4 av 4
                </Detail>
                <BodyShort className={'blokk-xs'}>Du kan få hjelp fra en veileder.</BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Du kan når som helst kontakte oss ved å bruke dialogen som vises på slutten av denne introduksjonen.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-04-standard'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />, <Kort4 />];

export default kortliste;
