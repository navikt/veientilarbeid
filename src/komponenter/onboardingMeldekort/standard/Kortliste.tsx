import { Systemtittel, Undertekst, Normaltekst } from 'nav-frontend-typografi';
import Feedback from '../../feedback/feedback';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Introduksjon til meldekort</Systemtittel>
                <Undertekst className={'blokk-xs'}>1 av 3</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    Når du er registrert som arbeidssøker, må du sende inn et meldekort hver 14. dag.
                </Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Det er innsending av meldekort som gjør at du opprettholder status som registrert arbeidssøker.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Du må også sende meldekort i perioden du venter svar på en innsendt søknad om dagpenger.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-01'} />
        </div>
    );
}

function Kort2() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Introduksjon til meldekort</Systemtittel>
                <Undertekst className={'blokk-xs'}>2 av 3</Undertekst>
                <Normaltekst className={'blokk-xs'}>
                    Utbetaling av dagpenger beregnes ut fra opplysninger du har lagt inn på meldekortet.
                </Normaltekst>
                <Normaltekst className={'blokk-xs'}>
                    Sender du inn meldekortet etter fristen, kan det føre til at du får mindre utbetalt.
                </Normaltekst>
                <Normaltekst className={'blokk-m'}>
                    Lar du være å sende inn meldekort, tolker NAV det som at du ikke ønsker å stå registrert som
                    arbeidssøker.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-02'} />
        </div>
    );
}

function Kort3() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Introduksjon til meldekort</Systemtittel>
                <Undertekst className={'blokk-xs'}>3 av 3</Undertekst>
                <Normaltekst className={'blokk-xs'}>
                    Dersom du sender inn meldekortet for sent vil dagpengene kunne stanses, og du risikerer at
                    arbeidsoppfølging fra NAV avsluttes.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Det er derfor viktig at du sender inn meldekortene før fristen går ut.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-03'} />
        </div>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />];

export default kortliste;
