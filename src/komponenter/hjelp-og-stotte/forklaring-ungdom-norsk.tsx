import { BodyShort, Heading, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import Feedback from '../feedback/feedback';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { Servicegruppe, useOppfolgingData } from '../../hooks/use-oppfolging-data';

function Avsnitt1() {
    return (
        <div>
            <BodyShort className={spacingStyles.blokkXs}>
                På grunn av din alder omfattes du av NAV forsterkede ungdomsinnsats.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                Arbeidssøkere under 30 år med behov for tjenester fra NAV har en særskilt prioritering.
            </BodyShort>
        </div>
    );
}

function Avsnitt2() {
    return (
        <div>
            <Heading size="xsmall">
                I løpet av den første tiden vil du jobbe tett sammen med en veileder fra NAV.
            </Heading>

            <BodyShort className={spacingStyles.blokkXs}>
                For å være registrert som arbeidssøker med de rettighetene det gir, så er det viktig at du svarer på
                henvendelsene og husker å sende inn meldekort til rett tid.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                Vi har laget en kort gjennomgang av det viktigste omkring meldekort og anbefaler at den også leses.
            </BodyShort>
        </div>
    );
}

function Avsnitt3() {
    const { amplitudeData } = useAmplitudeData();

    function loggLenkeKlikk(handling: string, url: string) {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling,
            ...amplitudeData,
        });
        window.location.assign(url);
    }

    return (
        <div>
            <Heading size="xsmall">Hva er en veileder?</Heading>
            <BodyShort className={spacingStyles.blokkXs}>
                En veileder sin oppgave er å besvare spørsmål, være tilgjengelig, støtte og samarbeide med deg mot ditt
                arbeidsmål avhengig av hva du trenger. Veileder kan for eksempel bistå rundt det å søke stillinger og
                tilby hjelp på veien til arbeid.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                Veiledere har dessverre <strong>ikke</strong> mulighet til å besvare på spørsmål som handler om
                behandling av søknader eller utbetalinger av dagpenger.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkM}>
                Dersom du lurer på noe om dagpenger ber vi deg bruke{' '}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra 14a onboarding kort',
                            'https://mininnboks.nav.no/sporsmal/skriv/ARBD',
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
                            'https://www.nav.no/person/kontakt-oss/chat/',
                        )
                    }
                >
                    chat
                </Link>
                .
            </BodyShort>
        </div>
    );
}

function Avsnitt4() {
    const { servicegruppe } = useOppfolgingData();
    const { amplitudeData } = useAmplitudeData();

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };

    const tittel = servicegruppe === Servicegruppe.IKVAL ? 'Du har mottatt et brev' : 'Du vil motta et brev';

    return (
        <div>
            <Heading size="xsmall">{tittel}</Heading>
            <BodyShort className={spacingStyles.blokkXs}>
                {servicegruppe === Servicegruppe.IKVAL ? (
                    <>
                        Du har mottatt brevet{' '}
                        <Link onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                            «NAV har vurdert dine muligheter»
                        </Link>
                        . Det betyr at NAV basert på informasjonen du har gitt oss, har vurdert hvilken støtte som kan
                        passe for deg.
                    </>
                ) : (
                    'Du vil i løpet av den første uken motta brevet «NAV har vurdert dine muligheter». Der vil NAV basert på informasjonen du har gitt oss, vurdere hvilken støtte som kan passe for deg.'
                )}
            </BodyShort>
            <BodyShort className={spacingStyles.blokkM}>
                Dette brevet er ikke et svar på en eventuell søknad om dagpenger.
            </BodyShort>
        </div>
    );
}

function Forklaring() {
    return (
        <>
            <Avsnitt1 />
            <Avsnitt2 />
            <Avsnitt3 />
            <Avsnitt4 />
            <Feedback id={'hjelp-og-stotte-forklaring-ungdom'} />
        </>
    );
}

export default Forklaring;
