import { useState } from 'react';
import { Box, Detail, ReadMore } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import MeldekortHovedInnhold from './meldekort-hovedinnhold';
import MeldekortForklaring from './meldekort-forklaring';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';

import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';
import { FeatureToggles, useFeatureToggleData } from '../../contexts/feature-toggles';
import MeldekortMikrofrontend from '../meldekort-mikrofrontend/meldekort-mikrofrontend';
import spacingStyles from '../../spacing.module.css';

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
    const { amplitudeData } = useAmplitudeData();
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const brukTabsDemo = useSkalBrukeTabs();
    const featuretoggleData = useFeatureToggleData();
    const brukMeldekortMikrofrontend = featuretoggleData[FeatureToggles.BRUK_MELDEKORT_MIKROFRONTEND];
    const handleClickLesMer = () => {
        if (!clickedLesMer) {
            loggAktivitet({ aktivitet: 'Leser forklaringen for meldekort', ...amplitudeData });
            setClickedLesMer(true);
        }
    };

    return (
        <Box>
            {!brukTabsDemo && (
                <Detail uppercase className={spacingStyles.mt1}>
                    Meldekort og meldeplikt
                </Detail>
            )}
            {brukMeldekortMikrofrontend ? <MeldekortMikrofrontend /> : <MeldekortHovedInnhold />}
            <ReadMore size="medium" header={tekst('overskrift')} onClick={handleClickLesMer}>
                <MeldekortForklaring />
            </ReadMore>
        </Box>
    );
}

export default Meldekort;
