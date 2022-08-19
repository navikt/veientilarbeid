import { BodyShort, Detail, Heading, Link } from '@navikt/ds-react';
import Feedback from '../../../feedback/feedback-legacy';
import { useContext } from 'react';
import { OppfolgingContext, Servicegruppe } from '../../../../contexts/oppfolging';
import { useAmplitudeData } from '../../../../contexts/amplitude-context';
import { amplitudeLogger } from '../../../../metrics/amplitude-utils';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">What kind of help can I get?</Heading>
                <Detail size="small" className="blokk-xs">
                    1 of 4
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    NAV has made an assesement of your answers, and it seems you have good chances of getting a job on
                    your own.
                </BodyShort>

                <BodyShort>The assesement is based on:</BodyShort>
                <ul>
                    <li>your answers from the registration</li>
                    <li>information NAV has about your situation</li>
                </ul>
            </div>
            <Feedback id={'Introkort14A-en-01-standard'} />
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

    const tittel = servicegruppe === Servicegruppe.IKVAL ? 'You have received a letter' : 'You will receive a letter';

    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">{tittel}</Heading>
                <Detail size="small" className="blokk-xs">
                    2 of 4
                </Detail>
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
            <Feedback id={'Introkort14A-en-02-standard'} />
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
                <Heading size="medium">What is a counselor?</Heading>
                <Detail size="small" className="blokk-xs">
                    3 of 4
                </Detail>
                <BodyShort className={'blokk-xs'}>
                    The job of a counselor is to answer questions, and to offer help and support with getting you back
                    to work.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Counselors can <strong>not</strong> answer questions about applications, processing of applications
                    or payments of unemployment benefits.
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
            <Feedback id={'Introkort14A-en-03-standard'} />
        </div>
    );
}

function Kort4() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">Get in touch if you need help</Heading>
                <Detail size="small" className="blokk-xs">
                    4 of 4
                </Detail>
                <BodyShort className={'blokk-xs'}>You can get help from a counselor.</BodyShort>

                <BodyShort className={'blokk-xs'}>
                    You will then have to reach out to a counselor by using the dialogue at the end of this
                    introduction.
                </BodyShort>

                <BodyShort className={'blokk-m'}>
                    You may contact us right away, or give it a shot on your own first.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-en-04-standard'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />, <Kort4 />];

export default kortliste;
