import { ChatIcon } from '@navikt/aksel-icons';
import { BodyLong, Detail, Heading, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';
import { AktivitetsplanLenke, GaaTilDialogKnapp } from './lenker';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Du ønsker å klare deg uten veileder',
        headingUenig: 'Du har sagt at du ønsker hjelp fra en veileder',
        beskrivelseEnig: 'Du har ansvar for å aktivt lete etter jobber og å søke på relevante stillinger på egen hånd.',
        behovForVeiledningLikevel: 'Gi beskjed i dialogen dersom du likevel har behov for veiledning.',
        fortellMer: 'Fortell oss hva du trenger hjelp til for å komme i arbeid.',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function EnigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const featureToggleData = useFeatureToggleData();
    const brukTabsDemo = featureToggleData['aia.bruk-tabs-demo'];

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - enig - standard" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <ChatIcon />
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
                        aktivitet={'Behovsavklaring - svart - standard - enig - går til aktivitetsplanen'}
                    />
                </BodyLong>
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - svart - enig - standard i viewport" />
        </Panel>
    );
}

function UenigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - uenig - standard" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <ChatIcon aria-hidden="true" />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('overskrift')}
                </Detail>
                <Heading className={spacingStyles.blokkXs} size="medium">
                    {tekst('headingUenig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>{tekst('fortellMer')}</BodyLong>
                <BodyLong className={spacingStyles.mb1}>
                    <GaaTilDialogKnapp />
                </BodyLong>
                <BodyLong className={spacingStyles.mb1}>{tekst('hjelpOgVedtak')}</BodyLong>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <AktivitetsplanLenke
                        aktivitet={'Behovsavklaring - svart - standard - uenig - går til aktivitetsplanen'}
                    />
                </BodyLong>
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - svart - uenig - standard i viewport" />
        </Panel>
    );
}

function BehovsavklaringSvartStandard() {
    const { behovForVeiledning } = useBehovForVeiledning();
    return !behovForVeiledning || behovForVeiledning?.oppfolging === ForeslattInnsatsgruppe.STANDARD_INNSATS ? (
        <EnigMedProfilering />
    ) : (
        <UenigMedProfilering />
    );
}

export default BehovsavklaringSvartStandard;
