import { BodyLong, Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import Feedback from '../feedback/feedback';

const TEKSTER = {
    nb: {
        kort1Body1: 'Når du er registrert som arbeidssøker, må du sende inn et meldekort hver 14. dag.',
        kort1Body2: 'Det er innsendingen av meldekort som gjør at du fortsetter å stå registrert som arbeidssøker.',
        kort1Body3: 'Hvis du har søkt dagpenger, må du sende meldekort mens du venter på svar.',
        kort2Heading: 'Hva brukes meldekortet til?',
        kort2Body1: 'Utbetaling av dagpenger beregnes ut fra opplysningene du har lagt inn på meldekortet.',
        kort2Body2: 'Når du sender inn meldekortet, tolker NAV det som at du ønsker å stå registrert som arbeidssøker.',
        kort3Heading: 'Send meldekort før fristen går ut',
        kort3Body1:
            'Hvis du ikke sender inn meldekortet innen fristen vil vi kunne redusere eller stanse dagpengene dine, og avslutte arbeidsoppfølgingen.',
        kort3Body2: 'Det er derfor viktig at du sender inn meldekortene før fristen går ut.',
    },
    en: {
        kort1Body1:
            'When you are registered as a job seeker, you have to submit the employment status form once every 14. day.',
        kort1Body2: 'It is by submitting the employment status form you keep your status as a registered job seeker.',
        kort1Body3: 'You also have to send in the form while having a pending application for unemployment benefits.',
        kort2Heading: 'What is the purpose of the employment status form?',
        kort2Body1: 'Payment of unemployment benefits is calculated from information in the employment status form.',
        kort2Body2:
            'If you do not submit the employment status form, NAV will assume that you do not want to be registered as a job seeker.',
        kort3Heading: 'Submit the employment status form before the due date',
        kort3Body1: 'If you do not submit the employment status form, you may loose your unemployment benefits',
        kort3Body2: 'It is important that you submit the employment status form on time.',
    },
};

function MeldekortForklaring() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <>
            <div className="blokk-s">
                <BodyLong>{tekst('kort1Body1')}</BodyLong>
                <BodyLong> {tekst('kort1Body2')}</BodyLong>
                <BodyLong>{tekst('kort1Body3')}</BodyLong>
            </div>
            <div className="blokk-s">
                <Heading size="xsmall">{tekst('kort2Heading')}</Heading>
                <BodyLong>{tekst('kort2Body1')}</BodyLong>
                <BodyLong>{tekst('kort2Body2')}</BodyLong>
            </div>
            <div className="blokk-s">
                <Heading size="xsmall">{tekst('kort3Heading')}</Heading>
                <BodyLong>
                    {tekst('kort3Body1')} {tekst('kort3Body2')}
                </BodyLong>
            </div>
            <Feedback id={'meldekort-forklaring'} />
        </>
    );
}

export default MeldekortForklaring;
