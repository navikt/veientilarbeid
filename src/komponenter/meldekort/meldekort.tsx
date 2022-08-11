import { useState } from 'react';
import { Detail, Panel, ReadMore } from '@navikt/ds-react';
import { Notes } from '@navikt/ds-icons';

import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useSprakValg } from '../../contexts/sprak';
import { useAmplitudeData } from '../../contexts/amplitude-context';

import MeldekortHovedInnhold from './meldekort-hovedinnhold';
import MeldekortForklaring from './meldekort-forklaring';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';

const TEKSTER = {
    nb: {
        overskrift: 'Hvorfor må jeg sende meldekort?',
    },
    en: {
        overskrift: 'Why do I need to submit an employment status form?',
    },
};

function Meldekort() {
    const [clickedLesMer, setClickedLesMer] = useState(false);
    const amplitudeData = useAmplitudeData();
    const featureToggles = useFeatureToggleData();
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const handleClickLesMer = () => {
        if (!clickedLesMer) {
            loggAktivitet({ aktivitet: 'Leser forklaringen for meldekort', ...amplitudeData });
            setClickedLesMer(true);
        }
    };

    if (!featureToggles['veientilarbeid.ny-standardvisning']) return null;

    return (
        <Panel className="flex px-1_5">
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Notes />
            </span>
            <div className="full-width">
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    Meldekort/meldeplikt
                </Detail>
                <MeldekortHovedInnhold />
                <ReadMore size="medium" header={tekst('overskrift')} onClick={handleClickLesMer}>
                    <MeldekortForklaring />
                </ReadMore>
            </div>
        </Panel>
    );
}

export default Meldekort;
