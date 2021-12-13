import { Heading, BodyShort, Detail } from '@navikt/ds-react';
import Feedback from '../../feedback/feedback';

function Kort1() {
    return (
        <>
            <div>
                <Heading size="medium">Send inn meldekort annenhver uke</Heading>
                <Detail size="small" className="blokk-xs">
                    1 av 3
                </Detail>

                <BodyShort size="small" className="blokk-xs">
                    Når du er registrert som arbeidssøker, må du sende inn et meldekort hver 14. dag.
                </BodyShort>

                <BodyShort size="small" className="blokk-xs">
                    Det er innsending av meldekort som gjør at du opprettholder status som registrert arbeidssøker.
                </BodyShort>

                <BodyShort size="small">
                    Du må også sende meldekort i perioden du venter svar på en innsendt søknad om dagpenger.
                </BodyShort>
            </div>
            <Feedback id={'meldekort-kort-01'} />
        </>
    );
}

function Kort2() {
    return (
        <>
            <div>
                <Heading size="medium">Hva brukes meldekortet til?</Heading>
                <Detail size="small" className="blokk-xs">
                    2 av 3
                </Detail>
                <BodyShort size="small" className="blokk-xs">
                    Utbetaling av dagpenger beregnes ut fra opplysninger du har lagt inn på meldekortet.
                </BodyShort>
                <BodyShort size="small" className="blokk-xs">
                    Sender du inn meldekortet etter fristen, kan det føre til at du får mindre utbetalt.
                </BodyShort>
                <BodyShort size="small">
                    Lar du være å sende inn meldekort, tolker NAV det som at du ikke ønsker å stå registrert som
                    arbeidssøker.
                </BodyShort>
            </div>
            <Feedback id={'meldekort-kort-02'} />
        </>
    );
}

function Kort3() {
    return (
        <>
            <div>
                <Heading size="medium">Send meldekort før fristen går ut</Heading>
                <Detail size="small" className="blokk-xs">
                    3 av 3
                </Detail>
                <BodyShort size="small" className="blokk-xs">
                    Dersom du sender inn meldekortet for sent vil dagpengene kunne stanses, og du risikerer at
                    arbeidsoppfølging fra NAV avsluttes.
                </BodyShort>

                <BodyShort size="small">
                    Det er derfor viktig at du sender inn meldekortene før fristen går ut.
                </BodyShort>
            </div>
            <Feedback id={'meldekort-kort-03'} />
        </>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />];

export default kortliste;
