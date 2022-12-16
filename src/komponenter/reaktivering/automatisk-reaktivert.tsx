import { Heading, Panel } from '@navikt/ds-react';
import { InformationColored } from '@navikt/ds-icons';

import { useFeatureToggleData, FeatureToggles } from '../../contexts/feature-toggles';

import InViewport from '../in-viewport/in-viewport';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

function AutomatiskReaktivert() {
    const featureToggleData = useFeatureToggleData();
    const kanViseKomponent = featureToggleData[FeatureToggles.BRUK_BEKREFT_REAKTIVERING];

    if (!kanViseKomponent) return null;

    return (
        <Panel className={spacingStyles.px1_5}>
            <div className={flexStyles.flex}>
                <span
                    style={{
                        marginRight: '0.5em',
                        position: 'relative',
                        top: '6px',
                        fontSize: 'var(--a-font-size-heading-medium)',
                    }}
                >
                    <InformationColored aria-hidden="true" />
                </span>
                <div>
                    <Heading size="medium">Du har blitt registrert som arbeidssøker på nytt!</Heading>
                </div>
            </div>
            <InViewport loggTekst="Viser automatisk reaktivert i viewport" />
        </Panel>
    );
}

export { AutomatiskReaktivert };
