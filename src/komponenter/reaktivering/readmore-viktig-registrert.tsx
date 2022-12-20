import { useState } from 'react';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { loggAktivitet } from '../../metrics/metrics';

import spacingStyles from '../../spacing.module.css';

function Innhold() {
    return (
        <div className={spacingStyles.mt1}>
            <BodyShort className={spacingStyles.mb1}>
                Noen av ytelsene fra NAV, for eksempel dagpenger og tiltakspenger, kan du bare motta hvis du er
                registrert som arbeidssøker.
            </BodyShort>
            <BodyShort className={spacingStyles.mb1}>
                NAV ønsker også at de som skal motta arbeidsrettet oppfølging er regisrert som arbeidssøker.
            </BodyShort>
            <BodyShort className={spacingStyles.mb1}>
                Du må være registrert som arbeidssøker fra du sender inn søknad om ytelse og helt frem til den siste
                dagen du ønsker å motta pengestøtten. Det er kun de dagene du er registrert som arbeidssøker du kan få
                utbetalt ytelse for.
            </BodyShort>
        </div>
    );
}

function ReadMoreViktigRegistrert() {
    const { amplitudeData } = useAmplitudeData();
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const handleClickOpenReadMoreViktigRegistrert = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Åpner ReadMore om inaktivering', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <ReadMore
            size="medium"
            header="Hvorfor er det viktig at jeg er registrert som arbeidssøker?"
            onClick={handleClickOpenReadMoreViktigRegistrert}
        >
            <Innhold />
        </ReadMore>
    );
}

export { ReadMoreViktigRegistrert };
