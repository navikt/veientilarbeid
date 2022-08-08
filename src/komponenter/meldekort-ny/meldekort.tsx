import { ReadMore } from '@navikt/ds-react';

import { useFeatureToggleData } from '../../contexts/feature-toggles';

import Sluttkort from './Sluttkort';
import Kortliste from './Kortliste';

function Meldekort() {
    const featureToggles = useFeatureToggleData();

    if (!featureToggles['veientilarbeid.ny-meldekortkomponent']) return null;

    return (
        <>
            <Sluttkort />
            <ReadMore size="medium" header="Hvorfor må jeg sende meldekort?">
                {Kortliste.map((item) => item)}
            </ReadMore>
        </>
    );
}

export default Meldekort;
