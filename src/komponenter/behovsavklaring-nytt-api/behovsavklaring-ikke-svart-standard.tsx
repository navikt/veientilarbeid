import { useState } from 'react';
import { BodyLong, Box, Button, Detail, Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import ReadMoreVurdering from './readmore-vurdering';

import spacingStyles from '../../spacing.module.css';

import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';
import { ForeslattInnsatsgruppe } from '../../hooks/use-brukerregistrering-data';
import { useProfilering } from '../../contexts/profilering';

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
    const brukTabsDemo = useSkalBrukeTabs();
    const [pendingRequest, settPendingRequest] = useState<ForeslattInnsatsgruppe | null>(null);
    const { profilering } = useProfilering();
    const profileringId = profilering[0]?.profileringId;
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
                profileringId,
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
        <Box>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - ikke svart - standard" />
            {!brukTabsDemo && (
                <Detail uppercase className={spacingStyles.mt1}>
                    {tekst('overskrift')}
                </Detail>
            )}
            <Heading className={spacingStyles.mb1} size="small">
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
            <InViewport loggTekst="Viser behovsavklaringkomponent - ikke svart - standard i viewport" />
        </Box>
    );
}

export default IkkeSvartPaaBehovsavklaringStandardInnsats;
