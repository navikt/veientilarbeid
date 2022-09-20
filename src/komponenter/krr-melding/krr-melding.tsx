import { Alert, BodyShort, Link } from '@navikt/ds-react';
import { difiLenke } from '../../innhold/lenker';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useUnderOppfolging } from '../../contexts/arbeidssoker';
import spacingStyles from '../../spacing.module.css';

const TEKSTER: Tekster<string> = {
    nb: {
        ingress: 'Du er reservert mot digital kommunikasjon med det offentlige.',
        'kulepunkt-ingress': 'Hvis du fjerner reservasjonen, kan du:',
        kulepunkt1: 'kommunisere med veilederen din på nett',
        kulepunkt2: 'bruke aktivitetsplanen din',
        kulepunkt3: 'motta digitale brev',
        lenketekst: 'Jeg vil fjerne reservasjonen',
    },
    en: {
        ingress: 'You have opted out of digital communication with public authorities.',
        'kulepunkt-ingress': 'If you opt in, you can:',
        kulepunkt1: 'communicate with your counselor online',
        kulepunkt2: 'use your activity plan',
        kulepunkt3: 'receive digital letters',
        lenketekst: 'I want to opt in',
    },
};

const KrrMelding = () => {
    const oppfolgingData = useOppfolgingData();
    const { reservasjonKRR } = oppfolgingData;
    const amplitudeData = useAmplitudeData();
    const underoppfolging = useUnderOppfolging()?.underoppfolging;
    const kanViseKomponent = underoppfolging;
    const tekster = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const handleLenkeKlikk = () => {
        loggAktivitet({ aktivitet: 'Går til krr-oppsett', ...amplitudeData });
    };

    if (!reservasjonKRR || !kanViseKomponent) return null;

    return (
        <Alert variant="warning" className={spacingStyles.blokkXs}>
            <BodyShort className={spacingStyles.blokkXs}>{tekster('ingress')}</BodyShort>
            <BodyShort>{tekster('kulepunkt-ingress')}</BodyShort>
            <ul>
                <li>{tekster('kulepunkt1')}</li>
                <li>{tekster('kulepunkt2')}</li>
                <li>{tekster('kulepunkt3')}</li>
            </ul>
            <Link href={difiLenke} onClick={handleLenkeKlikk}>
                {tekster('lenketekst')}
            </Link>
        </Alert>
    );
};

export default KrrMelding;
