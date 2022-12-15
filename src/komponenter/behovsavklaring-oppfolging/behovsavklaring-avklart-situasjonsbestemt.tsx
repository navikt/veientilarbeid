import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { ListeElement } from '../situasjonsbestemt/situasjonsbestemt';

import spacingStyles from '../../spacing.module.css';
import { AktivitetsplanLenke, DialogLenke } from './lenker';

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

    return ListeElement(
        <Dialog aria-hidden="true" />,
        <div>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - avklart - situasjonsbestemt" />
            <Heading className={spacingStyles.mb1} size="medium">
                {tekst('headingEnig')}
            </Heading>
            <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseEnigDialog')}.</BodyLong>
            <ReadMoreVeileder />
            <BodyLong className={spacingStyles.mt1}>
                <DialogLenke aktivitet={'Behovsavklaring - avklart - situasjonsbestemt - går til dialogen'} />
            </BodyLong>
            <BodyLong className={spacingStyles.mt1}>
                <AktivitetsplanLenke
                    aktivitet={'Behovsavklaring - avklart - situasjonsbestemt - går til aktivitetsplanen'}
                />
            </BodyLong>
            <InViewport loggTekst="Viser behovsavklaringkomponent - avklart - situasjonsbestemt i viewport" />
        </div>
    );
}

export default BehovsavklaringAvklartSituasjonsbestemt;
