import { Panel, ReadMore } from '@navikt/ds-react';

import { useFeatureToggleData } from '../../contexts/feature-toggles';

import Sluttkort from './Sluttkort';
import { Notes } from '@navikt/ds-icons';
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
                <Sluttkort />
                <ReadMore size="medium" header="Hvorfor må jeg sende meldekort?">
                    <MeldekortForklaring />
                </ReadMore>
            </div>
        </Panel>
    );
}

export default Meldekort;
