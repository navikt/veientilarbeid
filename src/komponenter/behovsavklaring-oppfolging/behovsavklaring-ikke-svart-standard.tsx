import { useState } from 'react';
import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Button, Detail, Heading, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import ReadMoreVurdering from './readmore-vurdering';
import { ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        heading: 'Vi tror du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra NAV',
        beskrivelse:
            'En veileders oppgave er å hjelpe deg med å søke stillinger og finne aktuelle tiltak på veien til arbeid.',
        hvaTenkerDu: 'Hva tenker du?',
        veilederKanIkke: 'En veileder kan ikke svare på spørsmål om dagpenger eller meldekort.',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
        behovOverskrift: 'Behov for veiledning',
        svarEnigKnappetekst: 'Jeg klarer meg uten veileder',
        svarUenigKnappetekst: 'Jeg trenger en veileder for å komme i arbeid',
        dialogtekstNavSinVurdering:
            'NAV sin vurdering: Vi tror du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra NAV.',
        dialogtekstMinVurdering: 'Min vurdering: ',
        dialogtekstSvarEnig: 'Jeg klarer meg uten veileder',
        dialogtekstSvarUenig: 'Jeg trenger en veileder for å komme i arbeid',
        dialogtekstAutomatiskGenerert: 'Dette er en automatisk generert melding.',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function IkkeSvartPaaBehovsavklaringStandardInnsats() {
    const { lagreBehovForVeiledning } = useBehovForVeiledning();
    const { amplitudeData } = useAmplitudeData();
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const featureToggleData = useFeatureToggleData();
    const brukTabsDemo = featureToggleData['aia.bruk-tabs-demo'];
    const [pendingRequest, settPendingRequest] = useState<ForeslattInnsatsgruppe | null>(null);

    async function onClickBehovForVeiledning(behov: ForeslattInnsatsgruppe) {
        const erStandard = behov === ForeslattInnsatsgruppe.STANDARD_INNSATS;

        // Dialogmeldingen skal gjenspeile svarene fra knappevalgene, endres det ene bør det andre også endres
        const dialogmelding =
            tekst('dialogtekstNavSinVurdering') +
            '\n\n' +
            tekst('dialogtekstMinVurdering') +
            (erStandard ? tekst('dialogtekstSvarEnig') : tekst('dialogtekstSvarUenig')) +
            '.\n\n' +
            tekst('dialogtekstAutomatiskGenerert');

        settPendingRequest(behov);
        try {
            await lagreBehovForVeiledning({
                oppfolging: behov,
                overskrift: tekst('behovOverskrift'),
                tekst: dialogmelding,
                venterPaaSvarFraNav: !erStandard,
            });
            loggAktivitet({
                ...amplitudeData,
                aktivitet: `Velger ${behov} fra behovsavklaringkomponent - ikke svart - standard`,
            });
        } finally {
            settPendingRequest(null);
        }
    }

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - ikke svart - standard" />
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
                {!brukTabsDemo && (
                    <Detail uppercase style={{ marginTop: '-1rem' }}>
                        {tekst('overskrift')}
                    </Detail>
                )}
                <Heading className={spacingStyles.mb1} size="medium">
                    {tekst('heading')}
                </Heading>
                <BodyLong className={`${spacingStyles.mb1}`}>{tekst('beskrivelse')}</BodyLong>
                <BodyLong className={`${spacingStyles.mb1}`}>{tekst('veilederKanIkke')}</BodyLong>
                <Button
                    onClick={() => onClickBehovForVeiledning(ForeslattInnsatsgruppe.STANDARD_INNSATS)}
                    disabled={pendingRequest !== null}
                    loading={pendingRequest === ForeslattInnsatsgruppe.STANDARD_INNSATS}
                >
                    {tekst('svarEnigKnappetekst')}
                </Button>
                <div className={spacingStyles.mb1}>
                    <Button
                        onClick={() => onClickBehovForVeiledning(ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)}
                        disabled={pendingRequest !== null}
                        loading={pendingRequest === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS}
                        variant="secondary"
                        className={`${spacingStyles.mt1}`}
                    >
                        {tekst('svarUenigKnappetekst')}
                    </Button>
                </div>
                <ReadMoreVeileder />
                <ReadMoreVurdering />
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - ikke svart - standard i viewport" />
        </Panel>
    );
}

export default IkkeSvartPaaBehovsavklaringStandardInnsats;
