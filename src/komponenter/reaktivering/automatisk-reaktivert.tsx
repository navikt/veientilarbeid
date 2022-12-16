import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react';
import { InformationColored } from '@navikt/ds-icons';

import { useFeatureToggleData, FeatureToggles } from '../../contexts/feature-toggles';

import { ReadMoreInaktivering } from './readmore-derfor-ble-du-inaktivert';
import { ReadMoreViktigRegistrert } from './readmore-viktig-registrert';
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
                    <BodyLong className={spacingStyles.mb1}>
                        18. november ble arbeidssøkerperioden din avsluttet.
                    </BodyLong>
                    <BodyLong className={spacingStyles.mb1}>
                        29. november sendte du inn et meldekort der du svarte at du ønsker å være registrert som
                        arbeidssøker.
                    </BodyLong>
                    <BodyLong className={spacingStyles.mb1}>Derfor ble du registrert på nytt.</BodyLong>
                    <ReadMoreInaktivering />
                    <ReadMoreViktigRegistrert />
                    <div className={`${spacingStyles.mt1} ${flexStyles.flex} ${flexStyles.flexColumn}`}>
                        <Heading size="small" spacing>
                            Ønsker du å være registrert?
                        </Heading>
                        <Button className={spacingStyles.mb1}>Ja, jeg ønsker å være registrert</Button>
                        <Button variant="secondary">Nei, jeg ønsker ikke å være registrert</Button>
                    </div>
                </div>
            </div>
            <InViewport loggTekst="Viser automatisk reaktivert i viewport" />
        </Panel>
    );
}

export { AutomatiskReaktivert };
