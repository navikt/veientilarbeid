import { Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Feedback from '../../feedback/feedback';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">1 av 3</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    Det ser foreløpig ut til at du kan få hjelp og støtte fra en veileder.
                </Normaltekst>

                <Normaltekst>Vurderingen baserer seg på:</Normaltekst>
                <ul>
                    <li>
                        <Normaltekst>svarene fra registreringen</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>opplysningene NAV har om din situasjon</Normaltekst>
                    </li>
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
                <Systemtittel>Du vil motta et brev</Systemtittel>
                <Undertekst className="blokk-xs">2 av 3</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    Du har krav på en skriftlig vurdering fra NAV om hvilket behov NAV mener du har behov for.
                </Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    NAV tar som hovedregel kontakt før vi konkluderer med hva slags hjelp vi kan tilby deg.
                </Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Dersom vi ikke tar kontakt vil du motta et brev der vi formidler om hva slags oppfølging vi tror du
                    trenger.
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-02'} />
        </div>
    );
}

function Kort3() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Er det noe mer i din livssituasjon du ønsker å fortelle oss?</Systemtittel>
                <Undertekst className="blokk-xs">3 av 3</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    Dersom du mener du ikke trenger hjelp, eller at du ønsker hjelp nå med en gang, kan du ta kontakt
                    med veileder.
                </Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Du kan starte en dialog med veileder etter at du er har lest ferdig denne introduksjonen.
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-03'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />];

export default kortliste;
