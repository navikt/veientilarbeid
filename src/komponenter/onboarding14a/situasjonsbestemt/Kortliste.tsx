import { Heading, Detail, BodyShort } from '@navikt/ds-react';
import Feedback from '../../feedback/feedback';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="medium">Hva slags hjelp kan jeg få?</Heading>
                <Detail size="small" className="blokk-xs">
                    1 av 3
                </Detail>

                <BodyShort className={'blokk-xs'}>Du kan få hjelp og støtte fra en veileder.</BodyShort>

                <BodyShort>Vurderingen baserer seg på:</BodyShort>
                <ul>
                    <li>dine svar fra registreringen</li>
                    <li>opplysningene NAV har om din situasjon</li>
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
                <Heading size="medium">Du vil motta et brev</Heading>
                <Detail size="small" className="blokk-xs">
                    2 av 3
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    Du har krav på en skriftlig vurdering fra NAV om hvilket behov NAV mener du har behov for.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    NAV tar som hovedregel kontakt før vi konkluderer med hva slags hjelp vi kan tilby deg.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Dersom vi ikke tar kontakt vil du motta et brev der vi formidler om hva slags oppfølging vi tror du
                    trenger.
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
                <Heading size="medium">Ønsker du å ta kontakt med oss?</Heading>
                <Detail size="small" className="blokk-xs">
                    3 av 3
                </Detail>

                <BodyShort className={'blokk-xs'}>
                    Dersom du mener du ikke trenger hjelp, eller at du ønsker hjelp nå med en gang, kan du ta kontakt
                    med en veileder.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Du kan starte en dialog med veilederen etter at du er har lest ferdig denne introduksjonen.
                </BodyShort>
            </div>
            <Feedback id={'Introkort14A-03'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />];

export default kortliste;
