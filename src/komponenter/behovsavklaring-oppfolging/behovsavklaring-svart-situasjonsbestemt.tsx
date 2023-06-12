import { ChatIcon } from '@navikt/aksel-icons';
import { BodyLong, Heading, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';

import spacingStyles from '../../spacing.module.css';
import { AktivitetsplanLenke, DialogLenke, GaaTilDialogKnapp } from './lenker';
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

function EnigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
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
                <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - enig - situasjonsbestemt" />
                <Heading className={spacingStyles.mb1} size="medium">
                    {tekst('headingEnig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseEnigDialog')}.</BodyLong>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <DialogLenke aktivitet={'Behovsavklaring - svart - situasjonsbestemt - enig - går til dialogen'} />
                </BodyLong>
                <BodyLong className={spacingStyles.mt1}>
                    <AktivitetsplanLenke
                        aktivitet={'Behovsavklaring - svart - situasjonsbestemt - enig - går til aktivitetsplanen'}
                    />
                </BodyLong>
                <InViewport loggTekst="Viser behovsavklaringkomponent - svart - enig - situasjonsbestemt i viewport" />
            </div>
        </Panel>
    );
}

function UenigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
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
                <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - uenig - situasjonsbestemt" />
                <Heading className={spacingStyles.mb1} size="medium">
                    {tekst('headingUenig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseUenig')}</BodyLong>
                <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseUenigDialog')}.</BodyLong>
                <BodyLong className={spacingStyles.mb1}>
                    <GaaTilDialogKnapp tekst={tekst('skrivTilVeileder')} />
                </BodyLong>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <DialogLenke aktivitet={'Behovsavklaring - svart - situasjonsbestemt - uenig - går til dialogen'} />
                </BodyLong>
                <BodyLong className={spacingStyles.mt1}>
                    <AktivitetsplanLenke
                        aktivitet={'Behovsavklaring - svart - situasjonsbestemt - uenig - går til aktivitetsplanen'}
                    />
                </BodyLong>
                <InViewport loggTekst="Viser behovsavklaringkomponent - svart - uenig - situasjonsbestemt i viewport" />
            </div>
        </Panel>
    );
}

function BehovsavklaringSvartSituasjonsbestemt() {
    const { behovForVeiledning } = useBehovForVeiledning();
    return !behovForVeiledning ||
        behovForVeiledning?.oppfolging === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS ? (
        <EnigMedProfilering />
    ) : (
        <UenigMedProfilering />
    );
}

export default BehovsavklaringSvartSituasjonsbestemt;
