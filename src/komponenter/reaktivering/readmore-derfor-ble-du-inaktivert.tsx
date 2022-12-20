import { useState } from 'react';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { loggAktivitet } from '../../metrics/metrics';

import spacingStyles from '../../spacing.module.css';

function Innhold() {
    return (
        <div className={spacingStyles.mt1}>
            <BodyShort className={spacingStyles.mb1}>
                Vanligste årsak til dette er
                <ul>
                    <li>at du har sendt inn ett eller flere meldekort for sent</li>
                    <li>
                        at du på et meldekort har svart nei på om du fortsatt ønsker å være registrert som arbeidssøker.
                    </li>
                </ul>
            </BodyShort>
            <BodyShort className={spacingStyles.mb1}>
                Dersom du ønsker å være registrert som arbeidssøker må du
                <ul>
                    <li>sende inn meldekortet innen fristen hver 14. dag</li>
                    <li>svare ja på at du fortsatt ønsker å være registrert som arbeidssøker</li>
                </ul>
            </BodyShort>
            <BodyShort className={spacingStyles.mb1}>
                Gjør du ikke dette vil NAV gå ut fra at du ikke ønsker å være registrert som arbeidssøker og at du
                heller ikke har behov for å motta dagpenger eller tiltakspenger.
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
            header="Hvorfor ble arbeidssøkerperioden min avsluttet?"
            onClick={handleClickOpenReadMoreInaktivering}
        >
            <Innhold />
        </ReadMore>
    );
}

export { ReadMoreInaktivering };
