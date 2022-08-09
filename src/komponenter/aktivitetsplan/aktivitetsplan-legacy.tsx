import { useContext } from 'react';
import { LinkPanel } from '@navikt/ds-react';

import DesignMug from './design-mug';
import { loggAktivitet } from '../../metrics/metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

const TEKSTER = {
    nb: {
        overskrift: 'Aktivitetsplanen din',
        ingress: 'Her holder du orden på aktiviteter du gjør i samarbeid med NAV.',
    },
    en: {
        overskrift: 'Your planned activities',
        ingress: 'Tool to track activities you do in collaboration with NAV.',
    },
};

const AktivitetsplanLegacy = () => {
    const amplitudeData = useAmplitudeData();
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const kanViseKomponent = underOppfolging;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const featuretoggleData = useFeatureToggleData();

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til aktivitetsplanen', ...amplitudeData });
    };

    if (featuretoggleData['veientilarbeid.ny-standardvisning']) return null;

    return !kanViseKomponent ? null : (
        <LinkPanel href={aktivitetsplanLenke} className="blokk-xs" onClick={handleClick}>
            <div
                style={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gap: 'var(--navds-spacing-8)',
                    alignItems: 'center',
                }}
            >
                <DesignMug />
                <div>
                    <LinkPanel.Title>{tekst('overskrift')}</LinkPanel.Title>
                    <LinkPanel.Description>{tekst('ingress')}</LinkPanel.Description>
                </div>
            </div>
        </LinkPanel>
    );
};

export default AktivitetsplanLegacy;
