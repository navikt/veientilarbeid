import { useState } from 'react';
import { Detail, Panel, ReadMore } from '@navikt/ds-react';
import { Notes } from '@navikt/ds-icons';

import { useSprakValg } from '../../contexts/sprak';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

import MeldekortHovedInnhold from './meldekort-hovedinnhold';
import MeldekortForklaring from './meldekort-forklaring';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { useBesvarelse } from '../../contexts/besvarelse';
import { MeldekortInfoAlert } from '../endre-situasjon/meldekort-info';

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
    const featureToggleData = useFeatureToggleData();
    const brukTabsDemo = featureToggleData['aia.bruk-tabs-demo'];
    const { besvarelse } = useBesvarelse();
    const { erBesvarelseEndret } = besvarelse || {};

    const handleClickLesMer = () => {
        if (!clickedLesMer) {
            loggAktivitet({ aktivitet: 'Leser forklaringen for meldekort', ...amplitudeData });
            setClickedLesMer(true);
        }
    };

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <Notes aria-hidden="true" />
            </span>
            <div className={spacingStyles.fullWidth}>
                {!brukTabsDemo && (
                    <Detail uppercase style={{ marginTop: '-1rem' }}>
                        Meldekort og meldeplikt
                    </Detail>
                )}
                <MeldekortHovedInnhold>
                    {erBesvarelseEndret && (
                        <MeldekortInfoAlert
                            visDropdown={false}
                            valgtSituasjon={besvarelse?.besvarelse?.dinSituasjon?.verdi}
                            tilleggsData={besvarelse?.besvarelse?.dinSituasjon?.tilleggsData}
                        />
                    )}
                </MeldekortHovedInnhold>

                <ReadMore size="medium" header={tekst('overskrift')} onClick={handleClickLesMer}>
                    <MeldekortForklaring />
                </ReadMore>
            </div>
        </Panel>
    );
}

export default Meldekort;
