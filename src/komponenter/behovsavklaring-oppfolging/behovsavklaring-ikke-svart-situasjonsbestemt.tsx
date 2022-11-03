import { Dialog } from '@navikt/ds-icons';
import { BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useAmplitudeData } from '../../contexts/amplitude-context';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import ReadMoreVeileder from './readmore-veileder';
import ReadMoreVurdering from './readmore-vurdering';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';
import { ListeElement } from '../situasjonsbestemt/situasjonsbestemt';

import spacingStyles from '../../spacing.module.css';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        heading: 'Ønsker du hjelp fra en veileder?',
        beskrivelse: 'Vi tror du vil trenge hjelp fra en veileder for å nå ditt mål om arbeid.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å få hjelp fra en veileder?',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
        behovOverskrift: 'Mitt behov for veiledning',
        behovSvarEnig:
            'Spørsmål: Ønsker du å få hjelp fra en veileder?\n\nMitt svar: Ja, jeg ønsker hjelp\n\nDette er en automatisk generert melding',
        behovSvarUenig:
            'Spørsmål: Ønsker du å få hjelp fra en veileder?\n\nMitt svar: Nei, jeg vil gjerne klare meg selv\n\nDette er en automatisk generert melding',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function IkkeSvartPaaBehovsavklaringSituasjonsbestemt() {
    const { lagreBehovForVeiledning } = useBehovForVeiledning();
    const { amplitudeData } = useAmplitudeData();
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    function handleBehovForVeiledning(behov: ForeslattInnsatsgruppe) {
        lagreBehovForVeiledning({
            oppfolging: behov,
            overskrift: tekst('behovOverskrift'),
            tekst: tekst(
                behov === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS ? 'behovSvarEnig' : 'behovSvarUenig'
            ),
        });
        loggAktivitet({
            ...amplitudeData,
            aktivitet: `Velger ${behov} fra behovsavklaringkomponent - ikke svart - situasjonsbestemt`,
        });
    }

    return ListeElement(
        <Dialog />,
        <div className={spacingStyles.fullWidth}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - ikke svart - situasjonsbestemt" />
            <Heading className={spacingStyles.blokkXs} size="medium">
                {tekst('heading')}
            </Heading>
            <BodyLong className={`${spacingStyles.mb1}`}>{tekst('beskrivelse')}</BodyLong>
            <BodyShort className={`${spacingStyles.mb1}`}>{tekst('hvaTenkerDu')}</BodyShort>
            <BodyShort className={`${spacingStyles.mb1}`}>{tekst('klareDegSelv')}</BodyShort>
            <Button onClick={() => handleBehovForVeiledning(ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)}>
                Ja, jeg ønsker hjelp
            </Button>
            <div className={spacingStyles.mb1}>
                <Button
                    onClick={() => handleBehovForVeiledning(ForeslattInnsatsgruppe.STANDARD_INNSATS)}
                    variant="secondary"
                    className={`${spacingStyles.mt1}`}
                >
                    Nei, jeg vil gjerne klare meg selv
                </Button>
            </div>
            <ReadMoreVurdering />
            <ReadMoreVeileder />
            <InViewport loggTekst="Viser behovsavklaringkomponent - ikke svart - situasjonsbestemt i viewport" />
        </div>
    );
}

export default IkkeSvartPaaBehovsavklaringSituasjonsbestemt;
