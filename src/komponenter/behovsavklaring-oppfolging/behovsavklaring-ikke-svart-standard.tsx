import { Dialog } from '@navikt/ds-icons';
import { BodyLong, BodyShort, Button, Detail, Heading, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { BehovForVeiledningValg, useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useAmplitudeData } from '../../contexts/amplitude-context';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import ReadMoreVurdering from './readmore-vurdering';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        heading: 'Hva slags veiledning ønsker du?',
        beskrivelse:
            'Vi tror du har gode muligheter til å nå ditt mål om arbeid på egenhånd - uten hjelp fra veileder.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å klare deg selv?',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
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

    function handleBehovForVeiledning(behov: BehovForVeiledningValg) {
        lagreBehovForVeiledning({ oppfolging: behov });
        loggAktivitet({ ...amplitudeData, aktivitet: `Velger ${behov} fra behovsavklaringkomponent standard` });
    }

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - ikke svart - standard" />
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
                    {tekst('heading')}
                </Heading>
                <BodyLong className={`${spacingStyles.mb1}`}>{tekst('beskrivelse')}</BodyLong>
                <BodyShort className={`${spacingStyles.mb1}`}>{tekst('hvaTenkerDu')}</BodyShort>
                <BodyShort className={`${spacingStyles.mb1}`}>{tekst('klareDegSelv')}</BodyShort>
                <div className={`${flexStyles.flex} ${flexStyles.flexColumn} ${spacingStyles.mb1}`}>
                    <Button onClick={() => handleBehovForVeiledning('KLARE_SEG_SELV')}>
                        Ja, jeg ønsker å klare meg selv
                    </Button>
                    <Button
                        onClick={() => handleBehovForVeiledning('ONSKER_OPPFOLGING')}
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
