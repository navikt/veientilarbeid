import { useState } from 'react';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { loggAktivitet } from '../../metrics/metrics';

import spacingStyles from '../../spacing.module.css';

function Innhold() {
    return (
        <div className={spacingStyles.mt1}>
            <BodyShort className={spacingStyles.mb1}>
                For å motta dagpenger må du være registrert som arbeidssøker.
            </BodyShort>

            <BodyShort className={spacingStyles.mb1}>
                Du må passe på at du er registrert som arbeidssøker fra du sender inn søknaden og helt frem til den
                siste dagen du ønsker å få dagpenger.
            </BodyShort>

            <BodyShort className={spacingStyles.mb1}>
                Det er kun de dagene du er registrert som arbeidssøker du kan få dagpenger for.
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
