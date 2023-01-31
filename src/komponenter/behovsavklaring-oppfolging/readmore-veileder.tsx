import { useState } from 'react';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { AmplitudeData } from '../../metrics/amplitude-utils';
import { loggAktivitet } from '../../metrics/metrics';
import STOogChat from './sto-og-chat';

import spacingStyles from '../../spacing.module.css';

interface Props {
    amplitudeData: AmplitudeData;
}

function Innhold(props: Props) {
    return (
        <div className={spacingStyles.mt1}>
            <BodyShort className={spacingStyles.blokkXs}>
                Veilederens oppgave er å besvare spørsmål, bistå deg med å søke stillinger og tilby deg hjelp på veien
                til arbeid.
            </BodyShort>

            <BodyShort className={spacingStyles.blokkXs}>
                Veilederne kan <strong>ikke</strong> svare på spørsmål om søknad om dagpenger, behandling av
                dagpengesøknaden, utbetaling av dagpenger eller utfylling av meldekort.
            </BodyShort>

            <STOogChat />
        </div>
    );
}

function ReadMoreVeileder() {
    const { amplitudeData } = useAmplitudeData();
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const handleClickOpenReadMoreVeileder = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Åpner ReadMore om veileder', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <ReadMore
            size="medium"
            header="Hva slags hjelp kan du få fra en veileder?"
            onClick={handleClickOpenReadMoreVeileder}
        >
            <Innhold amplitudeData={amplitudeData} />
        </ReadMore>
    );
}

export default ReadMoreVeileder;
