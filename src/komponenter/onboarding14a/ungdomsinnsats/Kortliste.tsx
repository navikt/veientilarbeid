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
                <Heading size="medium">Hva slags hjelp kan jeg som er under 30 få?</Heading>
                <Detail size="small" className="blokk-xs">
                    1 av 5
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    På grunn av din alder omfattes du av NAV forsterkede ungdomsinnsats.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Arbeidssøkere under 30 år med behov for tjenester fra NAV har en særskilt prioritering.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-01-standard-ungdomsinnsats'} />
        </div>
    );
}

function Kort2() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">
                    I løpet av den første tiden vil du jobbe tett sammen med en veileder fra NAV.
                </Heading>
                <Detail size="small" className="blokk-xs">
                    2 av 5
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    For å være registrert som arbeidssøker med de rettighetene det gir, så er det viktig at du svarer på
                    henvendelsene og husker å sende inn meldekort til rett tid.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Vi har laget en kort gjennomgang av det viktigste omkring meldekort og anbefaler at den også leses.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-02-standard-ungdomsinnsats'} />
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
                    3 av 5
                </Detail>
                <BodyShort className={'blokk-xs'}>
                    En veileder sin oppgave er å besvare spørsmål, være tilgjengelig, støtte og samarbeide med deg mot
                    ditt arbeidsmål avhengig av hva du trenger. Veileder kan for eksempel bistå rundt det å søke
                    stillinger og tilby hjelp på veien til arbeid.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Veiledere har dessverre <strong>ikke</strong> mulighet til å besvare på spørsmål som handler om
                    behandling av søknader eller utbetalinger av dagpenger.
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
            <Feedback id={'Introkort14A-03-standard-ungdomsinnsats'} />
        </div>
    );
}

function Kort4() {
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
                    4 av 5
                </Detail>
                <BodyShort className={'blokk-xs'}>
                    {servicegruppe === Servicegruppe.IKVAL ? (
                        <>
                            Du har mottatt brevet{' '}
                            <Link onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                                «NAV har vurdert dine muligheter»
                            </Link>
                            . Det betyr at NAV basert på informasjonen du har gitt oss, har vurdert hvilken støtte som
                            kan passe for deg.
                        </>
                    ) : (
                        'Du vil i løpet av den første uken motta brevet «NAV har vurdert dine muligheter». Der vil NAV basert på informasjonen du har gitt oss, vurdere hvilken støtte som kan passe for deg.'
                    )}
                </BodyShort>
                <BodyShort className={'blokk-m'}>
                    Dette brevet er ikke et svar på en eventuell søknad om dagpenger.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-04-standard-ungdomsinnsats'} />
        </div>
    );
}

function Kort5() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">Ta kontakt om du trenger hjelp</Heading>
                <Detail size="small" className="blokk-xs">
                    5 av 5
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    Du kan når som helst kontakte veileder ved å bruke dialogen som vises på slutten av denne
                    introduksjonen.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-05-standard-ungdomsinnsats'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />, <Kort4 />, <Kort5 />];

export default kortliste;
