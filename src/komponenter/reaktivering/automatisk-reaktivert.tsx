import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react';
import { InformationColored, Right } from '@navikt/ds-icons';

import { useFeatureToggleData, FeatureToggles } from '../../contexts/feature-toggles';

import { ReadMoreInaktivering } from './readmore-derfor-ble-du-inaktivert';
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
                    <BodyLong>Du sendte inn et meldekort 29. november.</BodyLong>
                    <BodyLong spacing>Der oppga du at du ønsker å være registrert som arbeidssøker.</BodyLong>
                    <BodyLong>Derfor ble du registrert på nytt.</BodyLong>
                    <ReadMoreInaktivering />
                    <div className={`${spacingStyles.mt1} ${flexStyles.flex} ${flexStyles.flexColumn}`}>
                        <Heading size="small" spacing>
                            Ønsker du å være registrert?
                        </Heading>
                        <Button icon={<Right aria-hidden="true" />} iconPosition="right" className={spacingStyles.mb1}>
                            Ja, jeg ønsker å være registrert
                        </Button>
                        <Button variant="secondary">Nei, jeg ønsker ikke å være registrert</Button>
                    </div>
                </div>
            </div>
            <InViewport loggTekst="Viser automatisk reaktivert i viewport" />
        </Panel>
    );
}

export { AutomatiskReaktivert };
