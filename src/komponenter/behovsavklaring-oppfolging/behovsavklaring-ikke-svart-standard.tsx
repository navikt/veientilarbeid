import { Dialog } from '@navikt/ds-icons';
import { BodyLong, BodyShort, Button, Detail, Heading, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import ReadMoreVurdering from './readmore-vurdering';
import { ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { useState } from 'react';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        heading: 'Hva slags veiledning ønsker du?',
        beskrivelse:
            'Vi tror du har gode muligheter til å nå ditt mål om arbeid på egenhånd - uten hjelp fra veileder.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å klare deg selv?',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
        behovOverskrift: 'Mitt behov for veiledning',
        behovSvarEnig:
            'Spørsmål: Ønsker du å klare deg selv?\n\nMitt svar: Ja, jeg ønsker å klare meg selv\n\nDette er en automatisk generert melding',
        behovSvarUenig:
            'Spørsmål: Ønsker du å klare deg selv?\n\nMitt svar: Nei, jeg har behov for veiledning\n\nDette er en automatisk generert melding',
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
    const [pendingRequest, settPendingRequest] = useState<ForeslattInnsatsgruppe | null>(null);

    async function onClickBehovForVeiledning(behov: ForeslattInnsatsgruppe) {
        settPendingRequest(behov);
        try {
            await lagreBehovForVeiledning({
                oppfolging: behov,
                overskrift: tekst('behovOverskrift'),
                tekst: tekst(behov === ForeslattInnsatsgruppe.STANDARD_INNSATS ? 'behovSvarEnig' : 'behovSvarUenig'),
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
                <Dialog />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('overskrift')}
                </Detail>
                <Heading className={spacingStyles.mb1} size="medium">
                    {tekst('heading')}
                </Heading>
                <BodyLong className={`${spacingStyles.mb1}`}>{tekst('beskrivelse')}</BodyLong>
                <BodyShort className={`${spacingStyles.mb1}`}>{tekst('hvaTenkerDu')}</BodyShort>
                <BodyShort className={`${spacingStyles.mb1}`}>{tekst('klareDegSelv')}</BodyShort>
                <Button
                    onClick={() => onClickBehovForVeiledning(ForeslattInnsatsgruppe.STANDARD_INNSATS)}
                    disabled={pendingRequest !== null}
                    loading={pendingRequest === ForeslattInnsatsgruppe.STANDARD_INNSATS}
                >
                    Ja, jeg ønsker å klare meg selv
                </Button>
                <div className={spacingStyles.mb1}>
                    <Button
                        onClick={() => onClickBehovForVeiledning(ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)}
                        disabled={pendingRequest !== null}
                        loading={pendingRequest === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS}
                        variant="secondary"
                        className={`${spacingStyles.mt1}`}
                    >
                        Nei, jeg har behov for veiledning
                    </Button>
                </div>
                <ReadMoreVurdering />
                <ReadMoreVeileder />
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - ikke svart - standard i viewport" />
        </Panel>
    );
}

export default IkkeSvartPaaBehovsavklaringStandardInnsats;
