import { Systemtittel, Undertekst, Normaltekst } from 'nav-frontend-typografi';
import Feedback from '../../feedback/feedback';

function Kort1() {
    return (
        <>
            <div>
                <Systemtittel>Hvor ofte skal jeg sende inn meldekort?</Systemtittel>
                <Undertekst className={'blokk-xs'}>1 av 3</Undertekst>
                <Normaltekst className={'blokk-xs'}>
                    For å være registrert som arbeidssøker, må du sende inn meldekortet hver 14. dag.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Har du fått beskjed om at du skal være registrert i NAV, må du også sender inn meldekortene hver 14.
                    dag.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-01'} />
        </>
    );
}

function Kort2() {
    return (
        <>
            <div>
                <Systemtittel>Hva skjer om jeg ikke sender inn meldekortet?</Systemtittel>
                <Undertekst className={'blokk-xs'}>2 av 3</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    Lar du være å sende inn meldekort, tolker NAV det som at du ikke ønsker å stå registrert som
                    arbeidssøker.
                </Normaltekst>
                <Normaltekst className={'blokk-m'}>
                    Venter du på svar på en innsendt søknad, kan du få avslag dersom du ikke har sendt inn meldekortet.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-02'} />
        </>
    );
}

function Kort3() {
    return (
        <>
            <div>
                <Systemtittel>Hva skjer om jeg sender inn meldekortet for sent?</Systemtittel>
                <Undertekst className={'blokk-xs'}>3 av 3</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    Utbetalingene av ytelser, som for eksempel dagpenger, vil kunne stanses dersom du sender meldekortet
                    for sent.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Det er også viktig å vite at du kan få mindre penger utbetalt dersom du sender meldekortene for
                    sent.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-03'} />
        </>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />];

export default kortliste;
