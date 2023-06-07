import { BodyLong, Button, Heading } from '@navikt/ds-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

import { loggAktivitet } from '../../metrics/metrics';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

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

const DagpengerHarIkkeSokt = (props: any) => {
    const { amplitudeData } = useAmplitudeData();
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
            <Heading size="medium" className={`${flexStyles.flex} ${spacingStyles.blokkXs}`}>
                {tekst('heading')}
            </Heading>
            {props.children}
            <BodyLong>{tekst('ingress')}</BodyLong>
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - ikke søkt dagpenger"' />

            <Button
                variant="primary"
                onClick={handleButtonClick}
                icon={<ChevronRightIcon aria-hidden="true" />}
                iconPosition="right"
            >
                {tekst('sok')}
            </Button>
        </>
    );
};

export default DagpengerHarIkkeSokt;
