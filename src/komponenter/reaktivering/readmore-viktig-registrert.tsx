import { useState } from 'react';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { Sprak } from '../../contexts/sprak';

import spacingStyles from '../../spacing.module.css';

const TEKSTER = {
    nb: {
        header: 'Hvorfor er det viktig at jeg er registrert som arbeidssøker?',
        ytelser:
            'Noen av ytelsene fra NAV, for eksempel dagpenger og tiltakspenger, kan du bare motta hvis du er registrert som arbeidssøker.',
        oppfolging: 'NAV ønsker også at de som skal motta arbeidsrettet oppfølging er registrert som arbeidssøker.',
        soknad: 'Du må være registrert som arbeidssøker fra du sender inn søknad om ytelse og helt frem til den siste dagen du ønsker å motta pengestøtten. Det er kun de dagene du er registrert som arbeidssøker du kan få utbetalt ytelse for.',
    },
    en: {
        header: 'Why is it important that I am registered as a job seeker?',
        ytelser:
            'You can only receive some of the benefits from NAV, such as unemployment benefit, work assessment allowance or employment scheme benefits, if you are registered as a job seeker.',
        oppfolging: 'NAV also wants those who are to receive work-oriented follow-up to be registered as jobseekers.',
        soknad: 'You must be registered as a job seeker from the time you submit your application for benefits until the last day you wish to receive the financial support. You can only receive benefits for the days you are registered as a job seeker.',
    },
};

interface Props {
    sprak: Sprak;
}

function Innhold(props: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);

    return (
        <div className={spacingStyles.mt1}>
            <BodyShort className={spacingStyles.mb1}>{tekst('ytelser')}</BodyShort>
            <BodyShort className={spacingStyles.mb1}>{tekst('oppfolging')}</BodyShort>
            <BodyShort className={spacingStyles.mb1}>{tekst('soknad')}</BodyShort>
        </div>
    );
}

function ReadMoreViktigRegistrert(props: Props) {
    const { amplitudeData } = useAmplitudeData();
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);

    const handleClickOpenReadMoreViktigRegistrert = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Åpner ReadMore om inaktivering', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <ReadMore size="medium" header={tekst('header')} onClick={handleClickOpenReadMoreViktigRegistrert}>
            <Innhold sprak={props.sprak} />
        </ReadMore>
    );
}

export { ReadMoreViktigRegistrert };
