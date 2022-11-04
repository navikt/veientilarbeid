import { useState } from 'react';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../../contexts/amplitude-context';

import { loggAktivitet } from '../../metrics/metrics';

function ReadMoreVurdering() {
    const { amplitudeData } = useAmplitudeData();
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const handleClickOpenReadMoreVeileder = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Åpner ReadMore om vurdering', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <ReadMore
            size="medium"
            header="Hvordan vurderer vi ditt behov for veiledning?"
            onClick={handleClickOpenReadMoreVeileder}
        >
            <BodyShort>Vår vurdering er basert på:</BodyShort>
            <ul>
                <li>dine svar fra registreringen</li>
                <li>opplysningene NAV har om din situasjon</li>
                <li>det du selv mener</li>
            </ul>
        </ReadMore>
    );
}

export default ReadMoreVurdering;
