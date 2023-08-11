import { etterregistreringUrl } from '../../api/urls';
import { MeldekortData } from '../../types/MeldekortType';
import { BodyShort } from '@navikt/ds-react';
import { createMeldekortEtterregistreringText } from './meldekortEtterregistreringText';
import Label from '../../Label';
import LinkCard from '../../LinkCard';
import styles from '../../LinkCard.module.css';
import lagHentTekstForSprak, { Tekster } from '../../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../../contexts/sprak';

interface Props {
    meldekort: MeldekortData;
}

const TEKSTER: Tekster<string> = {
    nb: {
        'meldekort.label.etterregistrering': 'Du må sende {count} meldekort',
    },
    nn: {
        'meldekort.label.etterregistrering': 'Du må sende {count} meldekort',
    },
    en: {
        'meldekort.label.etterregistrering': 'You must send {count} employment status forms',
    },
};

const MeldekortEtterregistrering = ({ meldekort }: Props) => {
    let sprak = useSprakValg().sprak;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const title = createMeldekortEtterregistreringText(meldekort, sprak);
    const label = `${tekst('meldekort.label.etterregistrering')}`.replace(
        '{count}',
        `${meldekort.etterregistrerteMeldekort}`,
    );

    if (meldekort.etterregistrerteMeldekort > 0) {
        return (
            <LinkCard href={etterregistreringUrl}>
                <>
                    <BodyShort className={styles.text}>{title}</BodyShort>
                    <Label>{label}</Label>
                </>
            </LinkCard>
        );
    }

    return null;
};

export default MeldekortEtterregistrering;
