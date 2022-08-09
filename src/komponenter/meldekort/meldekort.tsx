import { Panel, ReadMore } from '@navikt/ds-react';
import { Notes } from '@navikt/ds-icons';

import { useFeatureToggleData } from '../../contexts/feature-toggles';

import MeldekortHovedInnhold from './meldekort-hovedinnhold';
import MeldekortForklaring from './meldekort-forklaring';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER = {
    nb: {
        overskrift: 'Hvorfor må jeg sende meldekort?',
    },
    en: {
        overskrift: 'Why do I need to submit an employment status form?',
    },
};

function Meldekort() {
    const featureToggles = useFeatureToggleData();
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!featureToggles['veientilarbeid.ny-standardvisning']) return null;

    return (
        <Panel className="flex">
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
                <MeldekortHovedInnhold />
                <ReadMore size="medium" header={tekst('overskrift')}>
                    <MeldekortForklaring />
                </ReadMore>
            </div>
        </Panel>
    );
}

export default Meldekort;
