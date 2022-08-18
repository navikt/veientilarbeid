import { Heading, Detail, BodyShort } from '@navikt/ds-react';
import Feedback from '../../../feedback/feedback-legacy';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">What kind of help can I get?</Heading>
                <Detail size="small" className="blokk-xs">
                    1 of 3
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    For the time being, it seems that you can get help and support from a counselor.
                </BodyShort>

                <BodyShort>The assesement is based on:</BodyShort>
                <ul>
                    <li>your answers from the registration</li>
                    <li>information NAV has about your situation</li>
                </ul>
            </div>
            <Feedback id={'Introkort14A-01'} />
        </div>
    );
}

function Kort2() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">You will receive a letter</Heading>
                <Detail size="small" className="blokk-xs">
                    2 of 3
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    You are entitled to a written assessment from NAV about what help NAV thinks you need.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    As a general rule, NAV contacts you before we conclude with what kind of help we can offer.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    If we do not get in touch, you will receive a letter in which we convey what kind of follow-up we
                    think you need.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-02'} />
        </div>
    );
}

function Kort3() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">Is there anything else in your life situation you want to tell us?</Heading>
                <Detail size="small" className="blokk-xs">
                    3 of 3
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    If you think you do not need help, or that you want help now, you can contact the counselor.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    You can start a dialogue with the counselor after you have finished reading this introduction.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-03'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />];

export default kortliste;
