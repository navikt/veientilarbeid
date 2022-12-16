import { useState } from 'react';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { loggAktivitet } from '../../metrics/metrics';

import spacingStyles from '../../spacing.module.css';

function Innhold() {
    return (
        <div className={spacingStyles.mt1}>
            <BodyShort className={spacingStyles.blokkXs}>
                Veilederens oppgave er å besvare spørsmål, bistå deg med å søke stillinger og tilby deg hjelp på veien
                til arbeid.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                Veilederne kan <strong>ikke</strong> svare på spørsmål om søknad om dagpenger, behandling av
                dagpengesøknaden eller utbetaling av dagpenger.
            </BodyShort>
        </div>
    );
}

function ReadMoreInaktivering() {
    const { amplitudeData } = useAmplitudeData();
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const handleClickOpenReadMoreInaktivering = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Åpner ReadMore om inaktivering', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <ReadMore
            size="medium"
            header="Hvorfor har jeg blitt inaktivert?"
            onClick={handleClickOpenReadMoreInaktivering}
        >
            <Innhold />
        </ReadMore>
    );
}

export { ReadMoreInaktivering };
