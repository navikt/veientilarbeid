import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Detail, Heading, Panel, ReadMore } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { AktivitetsplanLenke, DialogLenke, GaaTilDialogKnapp } from './lenker';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Du har gode muligheter til å klare deg selv',
        headingUenig: 'Du har sagt at du ønsker hjelp',
        beskrivelseEnig: 'Du har ansvar for å aktivt lete etter jobber og å søke på relevante stillinger på egenhånd.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å klare deg selv?',
        readMoreHeadingEnig: 'Gi beskjed dersom du likevel ønsker veiledning',
        readMoreInnholdEnig: 'Du kan når som helst ta kontakt for å starte samhandling med en veileder.',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function BehovsavklaringAvklartStandard() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - avklart - standard" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <Dialog aria-hidden="true" />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('overskrift')}
                </Detail>
                <Heading className={spacingStyles.mb1} size="medium">
                    {tekst('headingEnig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseEnig')}</BodyLong>
                <ReadMore size="medium" header={tekst('readMoreHeadingEnig')} className={spacingStyles.mb1}>
                    <BodyLong className={spacingStyles.blokkXs}>{tekst('readMoreInnholdEnig')}</BodyLong>
                    <GaaTilDialogKnapp />
                </ReadMore>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <DialogLenke aktivitet={'Behovsavklaring - avklart - standard - går til dialogen'} />
                </BodyLong>
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
