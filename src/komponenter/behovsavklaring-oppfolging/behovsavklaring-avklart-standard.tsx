import { ChatIcon } from '@navikt/aksel-icons';
import { BodyLong, Detail, Heading, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import responsiveStyles from '../../responsive.module.css';

import { AktivitetsplanLenke, GaaTilDialogKnapp } from './lenker';
import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra NAV',
        headingUenig: 'Du har sagt at du ønsker hjelp',
        beskrivelseEnig: 'Du har ansvar for å aktivt lete etter jobber og å søke på relevante stillinger på egen hånd.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å klare deg selv?',
        behovForVeiledningLikevel: 'Gi beskjed i dialogen dersom du likevel har behov for veiledning.',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function BehovsavklaringAvklartStandard() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const brukTabsDemo = useSkalBrukeTabs();

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - avklart - standard" />
            <span className={responsiveStyles.panelIcon}>
                <ChatIcon aria-hidden="true" />
            </span>
            <div className={spacingStyles.fullWidth}>
                {!brukTabsDemo && (
                    <Detail uppercase style={{ marginTop: '-1rem' }}>
                        {tekst('overskrift')}
                    </Detail>
                )}
                <Heading className={spacingStyles.mb1} size="medium">
                    {tekst('headingEnig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseEnig')}</BodyLong>
                <BodyLong className={spacingStyles.blokkXs}>{tekst('behovForVeiledningLikevel')}</BodyLong>
                <GaaTilDialogKnapp variant={'secondary'} />
                <div className={spacingStyles.mt1}>
                    <ReadMoreVeileder />
                </div>
                <BodyLong className={spacingStyles.mt1}>
                    <AktivitetsplanLenke
                        aktivitet={'Behovsavklaring - avklart - standard - går til aktivitetsplanen'}
                    />
                </BodyLong>
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - avklart - standard i viewport" />
        </Panel>
    );
}

export default BehovsavklaringAvklartStandard;
