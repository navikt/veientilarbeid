import { BodyLong, Button, Heading } from '@navikt/ds-react';
import { Next } from '@navikt/ds-icons';
import spacingStyles from '../../spacing.module.css';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Du har ikke sendt inn søknad om dagpenger',
        ingress: 'Du kan tidligst få dagpenger fra den dagen du sender inn søknaden.',
        sok: 'Søk om dagpenger',
    },
    en: {
        heading: 'You have not submitted an application for unemployment benefits',
        ingress: 'You can receive unemployment benefits at the earliest from the day you submit the application.',
        sok: 'Apply for unemployment benefits',
    },
};

const DagpengerHarIkkeSokt = () => {
    const amplitudeData = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const handleButtonClick = () => {
        loggAktivitet({
            aktivitet: 'Går til dagpengesøknad fra "dagpenger-tema - ikke søkt dagpenger"',
            ...amplitudeData,
        });
        window.location.assign(dagpengerSoknadLenke);
    };

    return (
        <>
            <Heading size="medium" className={`flex ${spacingStyles.blokkXs}`}>
                {tekst('heading')}
            </Heading>
            <BodyLong>{tekst('ingress')}</BodyLong>
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - ikke søkt dagpenger"' />

            <Button variant="primary" onClick={handleButtonClick} icon={<Next />} iconPosition="right">
                {tekst('sok')}
            </Button>
        </>
    );
};

export default DagpengerHarIkkeSokt;
