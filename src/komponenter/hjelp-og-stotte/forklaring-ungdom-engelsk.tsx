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
                Due to your age, you are covered by NAV's reinforced youth efforts.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                Jobseekers under the age of 30 in need of services from NAV have a special priority.
            </BodyShort>
        </div>
    );
}

function Avsnitt2() {
    return (
        <div>
            <Heading size="xsmall">You will work closely with a counselor from NAV.</Heading>

            <BodyShort className={spacingStyles.blokkXs}>
                In order to be registered as a jobseeker, it's important that you respond to inquiries and remember to
                submit the employment status form before the deadline.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                We have made a brief summary of the most important things you should know about employment status forms
                and recommend that you read it.
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
                )}
            </BodyShort>
            <BodyShort className={spacingStyles.blokkM}>
                This letter is not a response to any application for unemployment benefits.
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
