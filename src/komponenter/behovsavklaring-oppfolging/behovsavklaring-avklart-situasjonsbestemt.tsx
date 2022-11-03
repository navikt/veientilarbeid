import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Heading, Link, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';

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
        headingEnig: 'Dine samhandlingsverktøy mellom deg og din veileder',
        headingUenig: 'Du har sagt at du vil klare deg selv',
        beskrivelseEnigDialog:
            'Du kan skrive til din veileder i dialogen og du kan planlegge arbeidsrettede aktiviteter i aktivitetsplanen',
        beskrivelseUenig: 'En veileder vil ta stilling til ønsket ditt. Du vil få et vedtaksbrev om dette.',
        beskrivelseUenigDialog: 'Om du ønsker å skrive til veilederen, kan du gjøre det via dialogen',
        skrivTilVeileder: 'Skriv til veileder',
        aktivitetsplan: 'aktivitetsplanen',
        gaTilDialog: 'Gå til dialogen',
        gaTilAktivitetsplan: 'Gå til din aktivitetsplan',
    },
    en: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Dine samhandlingsverktøy mellom deg og din veileder',
        headingUenig: 'Du ønsker å klare deg selv',
        beskrivelseUenig:
            'Enn så lenge er du satt opp til å motta veiledning for å nå arbeidsmålene dine. En veileder vil vurdere det du har gitt av innspill og kanskje ta kontakt så dere kan vurdere dette sammen.',
        dialog: 'Gå til dialogen',
        aktivitetsplan: 'Gå til din aktivitetsplan',
    },
};

function BehovsavklaringAvklartSituasjonsbestemt() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel className={`${flexStyles.flex}`}>
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
            <div>
                <ErRendret loggTekst="Rendrer behovsavklaringkomponent - avklart - situasjonsbestemt" />
                <Heading className={spacingStyles.blokkXs} size="medium">
                    {tekst('headingEnig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseEnigDialog')}.</BodyLong>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <Link href={dialogLenke}>{tekst('gaTilDialog')}</Link>
                </BodyLong>
                <BodyLong className={spacingStyles.mt1}>
                    <Link href={aktivitetsplanLenke}>{tekst('gaTilAktivitetsplan')}</Link>
                </BodyLong>
                <InViewport loggTekst="Viser behovsavklaringkomponent - avklart - situasjonsbestemt i viewport" />
            </div>
        </Panel>
    );
}

export default BehovsavklaringAvklartSituasjonsbestemt;
