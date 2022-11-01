import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Detail, Heading, Panel, ReadMore } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Du ønsker å klare deg selv',
        headingUenig: 'Du har sagt at du ønsker hjelp',
        beskrivelse:
            'Vi tror du har gode muligheter til å søke og skaffe seg jobb på egenhånd - uten hjelp fra veileder.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å klare deg selv?',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function EnigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - enig - standard" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Dialog />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('overskrift')}
                </Detail>
                <Heading className={spacingStyles.blokkXs} size="medium">
                    {tekst('headingEnig')}
                </Heading>
                <ReadMore size="medium" header={tekst('readMoreHeading')} className={spacingStyles.mb1}>
                    [Gå til dialogen]
                </ReadMore>
                <ReadMoreVeileder />
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent  - svart - enig - standard i viewport" />
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
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Dialog />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('overskrift')}
                </Detail>
                <Heading className={spacingStyles.blokkXs} size="medium">
                    {tekst('headingUenig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>
                    En veileder vil ta stilling til om du kan få den hjelpen du etterspør.
                </BodyLong>
                <BodyLong className={spacingStyles.mb1}>Du finner det du skrev til veileder i dialogen.</BodyLong>
                <BodyLong className={spacingStyles.mb1}>
                    Om du har flere ting du tenker du vil si fra om kan du skrive mer i dialogen.
                </BodyLong>
                <BodyLong className={spacingStyles.mb1}>[Gå til dialogen]</BodyLong>
                <ReadMoreVeileder />
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - svart - uenig - standard i viewport" />
        </Panel>
    );
}

function BehovsavklaringSvartStandard() {
    const { behovForVeiledning } = useBehovForVeiledning();
    return behovForVeiledning!.oppfolging === ForeslattInnsatsgruppe.STANDARD_INNSATS ? (
        <EnigMedProfilering />
    ) : (
        <UenigMedProfilering />
    );
}

export default BehovsavklaringSvartStandard;
