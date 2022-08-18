import { useContext } from 'react';
import { BodyShort, Heading, Link } from '@navikt/ds-react';

import { useAmplitudeData } from '../../contexts/amplitude-context';

import Feedback from '../feedback/feedback-legacy';
import { OppfolgingContext, Servicegruppe } from '../../contexts/oppfolging';
import { amplitudeLogger } from '../../metrics/amplitude-utils';

function Kort1() {
    return (
        <div>
            <BodyShort className={'blokk-xs'}>
                Due to your age, you are covered by NAV's reinforced youth efforts.
            </BodyShort>

            <BodyShort className={'blokk-xs'}>
                Jobseekers under the age of 30 in need of services from NAV have a special priority.
            </BodyShort>
        </div>
    );
}

function Kort2() {
    return (
        <div>
            <Heading size="xsmall">You will work closely with a counselor from NAV.</Heading>

            <BodyShort className={'blokk-xs'}>
                In order to be registered as a jobseeker, it's important that you respond to inquiries and remember to
                submit the employment status form before the deadline.
            </BodyShort>

            <BodyShort className={'blokk-xs'}>
                We have made a brief summary of the most important things you should know about employment status forms
                and recommend that you read it.
            </BodyShort>
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
        <div>
            <Heading size="xsmall">What is a counselor?</Heading>

            <BodyShort className={'blokk-xs'}>
                The job of a counselor is to answer questions, and to offer help and support with getting you back to
                work.
            </BodyShort>

            <BodyShort className={'blokk-xs'}>
                Counselors can <strong>not</strong> answer questions about applications, processing of applications or
                payments of unemployment benefits.
            </BodyShort>

            <BodyShort className={'blokk-m'}>
                If you have questions about unemployment benefits, we ask you to{' '}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til STO fra 14a onboarding kort',
                            'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
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
                            'https://www.nav.no/person/kontakt-oss/chat/'
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

    const tittel = servicegruppe === Servicegruppe.IKVAL ? 'You have received a letter' : 'You will receive a letter';

    return (
        <div>
            <Heading size="xsmall">{tittel}</Heading>

            <BodyShort className={'blokk-xs'}>
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
            <BodyShort className={'blokk-m'}>
                This letter is not a response to any application for unemployment benefits.
            </BodyShort>
        </div>
    );
}

function Forklaring() {
    return (
        <>
            <Kort1 />
            <Kort2 />
            <Kort3 />
            <Kort4 />
            <Feedback id={'hjelp-og-stotte-forklaring-ungdom'} />
        </>
    );
}

export default Forklaring;
