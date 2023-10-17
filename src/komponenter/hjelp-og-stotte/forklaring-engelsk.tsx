import { BodyShort, Heading, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import Feedback from '../feedback/feedback';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { Servicegruppe, useOppfolgingData } from '../../hooks/use-oppfolging-data';

function Avsnitt1Engelsk() {
    return (
        <div>
            <BodyShort className={spacingStyles.blokkXs}>
                NAV has made an assessment of your answers, and it seems you have good chances of getting a job on your
                own.
            </BodyShort>

            <BodyShort>The assessment is based on:</BodyShort>
            <ul>
                <li>your answers from the registration</li>
                <li>information NAV has about your situation</li>
            </ul>
        </div>
    );
}

function Avsnitt2Engelsk() {
    const { servicegruppe } = useOppfolgingData();
    const { amplitudeData } = useAmplitudeData();

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };

    const tittel = servicegruppe === Servicegruppe.IKVAL ? 'You have received a letter' : 'You will receive a letter';

    return (
        <div>
            <Heading size="xsmall">{tittel}</Heading>
            <BodyShort className={spacingStyles.blokkXs}>
                {servicegruppe === Servicegruppe.IKVAL ? (
                    <>
                        You have received the letter{' '}
                        <Link onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                            «NAV har vurdert dine muligheter»
                        </Link>
                        .
                    </>
                ) : (
                    'You will receive the letter «NAV har vurdert dine muligheter» within a week.'
                )}{' '}
                The letter contains our assessment of your chances of getting a job on your own.
            </BodyShort>
            <BodyShort className={spacingStyles.blokkM}>
                This letter is not a response to any application for unemployment benefits.
            </BodyShort>
        </div>
    );
}

function Avsnitt3Engelsk() {
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
            <Heading size="xsmall">What is a counselor?</Heading>
            <BodyShort className={spacingStyles.blokkXs}>
                The job of a counselor is to answer questions, and to offer help and support with getting you back to
                work.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                Counselors can <strong>not</strong> answer questions about applications, processing of applications or
                payments of unemployment benefits.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkM}>
                If you have questions about unemployment benefits, we ask you to{' '}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra 14a onboarding kort',
                            'https://mininnboks.nav.no/sporsmal/skriv/ARBD',
                        )
                    }
                >
                    write to us
                </Link>{' '}
                or contact us on{' '}
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

function Avsnitt4Engelsk() {
    return (
        <div>
            <Heading size="xsmall">Get in touch if you need help</Heading>
            <BodyShort className={spacingStyles.blokkXs}>You can get help from a counselor.</BodyShort>
            <BodyShort className={spacingStyles.blokkM}>
                You may contact us right away, or give it a shot on your own first.
            </BodyShort>
        </div>
    );
}
function ForklaringEngelsk() {
    return (
        <>
            <Avsnitt1Engelsk />
            <Avsnitt2Engelsk />
            <Avsnitt3Engelsk />
            <Avsnitt4Engelsk />
            <Feedback id={'hjelp-og-stotte-forklaring'} className={spacingStyles.mt2} />
        </>
    );
}

export default ForklaringEngelsk;
