import { meldekortUrl } from '../../api/urls';
import { MeldekortData } from '../../types/MeldekortType';
import { BodyShort, LinkPanel } from '@navikt/ds-react';
import { createDatoLabel, createReadyForInnsendingText, createRisikererTrekkDescription } from './meldekortReadyText';
import Label from '../../Label';
import LinkCard from '../../LinkCard';
import styles from '../../LinkCard.module.css';
import { useSprakValg } from '../../../../contexts/sprak';
import lagHentTekstForSprak, { Tekster } from '../../../../lib/lag-hent-tekst-for-sprak';

interface Props {
    meldekort: MeldekortData;
}

const TEKSTER: Tekster<string> = {
    nb: {
        'meldekort.label.ready': 'Klart til innsending',
    },
    nn: {
        'meldekort.label.ready': 'Klart til innsending',
    },
    en: {
        'meldekort.label.ready': 'Ready to be sent',
    },
};

const MeldekortReady = ({ meldekort }: Props) => {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const title = createReadyForInnsendingText(meldekort, sprak);
    const dato = createDatoLabel(meldekort, sprak);
    const risikererTrekk = meldekort.nyeMeldekort?.nesteMeldekort?.risikererTrekk;
    const risikererTrekkDescription = createRisikererTrekkDescription(meldekort, sprak);

    return (
        <LinkCard href={meldekortUrl}>
            <>
                <BodyShort>{title}</BodyShort>
                <LinkPanel.Description className={styles.dato}>
                    {risikererTrekk ? risikererTrekkDescription : dato}
                </LinkPanel.Description>
                <Label>{tekst('meldekort.label.ready')}</Label>
            </>
        </LinkCard>
    );
};

export default MeldekortReady;
