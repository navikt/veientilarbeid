import { Heading, BodyShort, Detail } from '@navikt/ds-react';
import Feedback from '../../feedback/feedback-legacy';
import lagHentTekstForSprak from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

const TEKSTER = {
    nb: {
        av: 'av',
        kort1Heading: 'Hvor ofte skal jeg sende inn meldekort?',
        kort1Body1: 'For å være registrert som arbeidssøker, må du sende inn meldekortet hver 14. dag.',
        kort1Body2:
            'Har du fått beskjed om at du skal være registrert i NAV, må du også sende inn meldekortene hver 14. dag.',
        kort2Heading: 'Hva skjer om jeg ikke sender inn meldekortet?',
        kort2Body1:
            'Lar du være å sende inn meldekort, tolker NAV det som at du ikke ønsker å stå registrert som arbeidssøker.',
        kort2Body2:
            'Venter du på svar på en innsendt søknad, kan du få avslag dersom du ikke har sendt inn meldekortet.',
        kort3Heading: 'Hva skjer om jeg sender inn meldekortet for sent?',
        kort3Body1:
            'Hvis du ikke sender inn meldekortet innen fristen vil vi kunne redusere eller stanse ytelser, som for eksempel dagpengene dine, og avslutte arbeidsoppfølgingen.',
    },
    en: {
        av: 'of',
        kort1Heading: 'How often should I submit the employment status form?',
        kort1Body1: 'To be registered as a job seeker, you must submit the employment status form every 14. day.',
        kort1Body2: ' ',
        kort2Heading: "What will happen if I don't submit the employment status form?",
        kort2Body1:
            'If you do not submit the employment status form, NAV will assume that you do not want to be registered as a job seeker.',
        kort2Body2:
            'If you are waiting for a response to a submitted application, you can be rejected if you have not submitted the employment status form.',
        kort3Heading: 'What will happen if I submit the employment status form to late?',
        kort3Body1:
            'Payment of unemployment benefits may stop if you submit the employment status form after the due date.',
    },
};
function Kort1() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <div>
                <Heading size="medium">{tekst('kort1Heading')}</Heading>
                <Detail size="small" className="blokk-xs">
                    1 {tekst('av')} 3
                </Detail>
                <BodyShort className="blokk-xs">{tekst('kort1Body1')}</BodyShort>
                <BodyShort>{tekst('kort1Body2')}</BodyShort>
            </div>
            <Feedback id={'meldekort-kort-01'} />
        </>
    );
}

function Kort2() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <div>
                <Heading size="medium">{tekst('kort2Heading')}</Heading>
                <Detail size="small" className="blokk-xs">
                    2 {tekst('av')} 3
                </Detail>
                <BodyShort className="blokk-xs">{tekst('kort2Body1')}</BodyShort>
                <BodyShort>{tekst('kort2Body2')}</BodyShort>
            </div>
            <Feedback id={'meldekort-kort-02'} />
        </>
    );
}

function Kort3() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <div>
                <Heading size="medium">{tekst('kort3Heading')}</Heading>
                <Detail size="small" className="blokk-xs">
                    3 {tekst('av')} 3
                </Detail>
                <BodyShort className="blokk-xs">{tekst('kort3Body1')}</BodyShort>
            </div>
            <Feedback id={'meldekort-kort-03'} />
        </>
    );
}

const kortliste = [<Kort1 />, <Kort2 />, <Kort3 />];

export default kortliste;
