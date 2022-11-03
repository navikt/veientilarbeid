import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Button, Detail, Heading, Panel, ReadMore, Link } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { BehovForVeiledningResponse, useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { aktivitetsplanLenke, dialogLenke } from '../../innhold/lenker';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

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
        gaTilDialog: 'Gå til dialogen',
        gaTilAktivitetsplan: 'Gå til din aktivitetsplan',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

export function handleDialogKnapp(behovForVeiledning: BehovForVeiledningResponse) {
    return () => {
        const dialogId = behovForVeiledning?.dialogId ? `/${behovForVeiledning?.dialogId}` : '';
        window.location.href = `${dialogLenke}${dialogId}`;
    };
}

function BehovsavklaringAvklartStandard() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const { behovForVeiledning } = useBehovForVeiledning();

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
                <BodyLong className={spacingStyles.blokkXs}>{tekst('beskrivelseEnig')}</BodyLong>
                <ReadMore size="medium" header={tekst('readMoreHeadingEnig')} className={spacingStyles.mb1}>
                    <BodyLong className={spacingStyles.blokkXs}>{tekst('readMoreInnholdEnig')}</BodyLong>
                    <Button onClick={handleDialogKnapp(behovForVeiledning)}>{tekst('gaTilDialog')}</Button>
                </ReadMore>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <Link href={dialogLenke}>{tekst('gaTilDialog')}</Link>
                </BodyLong>
                <BodyLong className={spacingStyles.mt1}>
                    <Link href={aktivitetsplanLenke}>{tekst('gaTilAktivitetsplan')}</Link>
                </BodyLong>
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent  - svart - enig - standard i viewport" />
        </Panel>
    );
}

export default BehovsavklaringAvklartStandard;
