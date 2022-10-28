import { Dialog } from '@navikt/ds-icons';
import { BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { BehovForVeiledningValg, useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { useAmplitudeData } from '../../contexts/amplitude-context';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import ReadMoreVeileder from './readmore-veileder';
import { ListeElement } from '../situasjonsbestemt/situasjonsbestemt';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import ReadMoreVurdering from './readmore-vurdering';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        heading: 'Ønsker du hjelp fra en veileder?',
        beskrivelse: 'Vi tror du vil trenge hjelp fra en veileder for å nå ditt mål om arbeid.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å få hjelp fra en veileder?',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
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

    function handleBehovForVeiledning(behov: BehovForVeiledningValg) {
        lagreBehovForVeiledning(behov);
        loggAktivitet({ ...amplitudeData, aktivitet: `Velger ${behov} fra behovsavklaringkomponent` });
    }

    return ListeElement(
        <Dialog />,
        <div>
            <Heading className={spacingStyles.blokkXs} size="medium">
                {tekst('heading')}
            </Heading>
            <BodyLong className={`${spacingStyles.mb1}`}>{tekst('beskrivelse')}</BodyLong>
            <BodyShort className={`${spacingStyles.mb1}`}>{tekst('hvaTenkerDu')}</BodyShort>
            <BodyShort className={`${spacingStyles.mb1}`}>{tekst('klareDegSelv')}</BodyShort>
            <div className={`${flexStyles.flex} ${flexStyles.flexColumn} ${spacingStyles.mb1}`}>
                <Button onClick={() => handleBehovForVeiledning('ONSKER_OPPFOLGING')}>Ja, jeg ønsker hjelp</Button>
                <Button
                    onClick={() => handleBehovForVeiledning('KLARE_SEG_SELV')}
                    variant="secondary"
                    className={`${spacingStyles.mt1}`}
                >
                    Nei, jeg vil gjerne klare meg selv
                </Button>
            </div>
            <ReadMoreVurdering />
            <ReadMoreVeileder />
        </div>
    );
}

export default IkkeSvartPaaBehovsavklaringSituasjonsbestemt;
