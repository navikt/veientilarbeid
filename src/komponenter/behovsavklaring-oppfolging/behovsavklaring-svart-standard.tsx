import { BodyLong, Box, Detail, Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { AktivitetsplanLenke, GaaTilDialogKnapp } from './lenker';

import spacingStyles from '../../spacing.module.css';

import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';
import { ForeslattInnsatsgruppe } from '../../hooks/use-brukerregistrering-data';

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
    const brukTabsDemo = useSkalBrukeTabs();

    return (
        <Box>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - enig - standard" />
            {!brukTabsDemo && (
                <Detail uppercase className={spacingStyles.mt1}>
                    {tekst('overskrift')}
                </Detail>
            )}
            <Heading size="small" className={spacingStyles.mb1}>
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
            <InViewport loggTekst="Viser behovsavklaringkomponent - svart - enig - standard i viewport" />
        </Box>
    );
}

function UenigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const brukTabsDemo = useSkalBrukeTabs();
    return (
        <Box>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - uenig - standard" />
            {!brukTabsDemo && (
                <Detail uppercase className={spacingStyles.mt1}>
                    {tekst('overskrift')}
                </Detail>
            )}
            <Heading size="small" className={spacingStyles.blokkXs}>
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
            <InViewport loggTekst="Viser behovsavklaringkomponent - svart - uenig - standard i viewport" />
        </Box>
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
