import { Panel, ReadMore } from '@navikt/ds-react';
import { Notes } from '@navikt/ds-icons';

import { useFeatureToggleData } from '../../contexts/feature-toggles';

import MeldekortHovedInnhold from './meldekort-hovedinnhold';
import MeldekortForklaring from './meldekort-forklaring';

function Meldekort() {
    const featureToggles = useFeatureToggleData();

    if (!featureToggles['veientilarbeid.ny-meldekortkomponent']) return null;

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
            <div>
                <MeldekortHovedInnhold />
                <ReadMore size="medium" header="Hvorfor må jeg sende meldekort?">
                    <MeldekortForklaring />
                </ReadMore>
            </div>
        </Panel>
    );
}

export default Meldekort;
