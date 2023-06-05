import { Button, Heading, BodyShort } from '@navikt/ds-react';
import { Next } from '@navikt/ds-icons';

import {
    DpInnsynPaabegyntSoknad,
    useDpInnsynPaabegynteSoknaderData,
} from '../../contexts/dp-innsyn-paabegynte-soknader';
import { useSprakValg } from '../../contexts/sprak';

import { amplitudeLogger } from '../../metrics/amplitude-utils';
import prettyPrintDato from '../../utils/pretty-print-dato';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';

import spacingStyles from '../../spacing.module.css';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Du har startet på en søknad om dagpenger',
        ingress: 'Du kan tidligst få dagpenger fra den dagen du har søkt.',
        ikkeSendt: 'Du har ikke sendt inn søknaden.',
        fortsett: 'Fortsett på søknaden',
        pabegynt: 'du startet',
    },
    en: {
        heading: 'You have started on an application for unemployment benefits',
        ingress: 'You can receive unemployment benefits at the earliest from the day you have applied.',
        ikkeSendt: 'You have not submitted the application.',
        fortsett: 'Continue on the application',
        pabegynt: 'you started on',
    },
};

const DagpengerHarPaabegyntSoknad = (props: any) => {
    const { paabegynteSoknader = [] } = useDpInnsynPaabegynteSoknaderData();
    const { amplitudeData } = useAmplitudeData();

    const sistePabegynteSoknad = paabegynteSoknader.sort(
        (a: DpInnsynPaabegyntSoknad, b: DpInnsynPaabegyntSoknad) =>
            new Date(b.sistEndret).getTime() - new Date(a.sistEndret).getTime()
    )[0];

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const handleClickFortsett = () => {
        amplitudeLogger('veientilarbeid.tema', {
            tema: 'dagpenger',
            tilstand: '',
            handling: 'Fortsetter påbegynt soknad',
            ...amplitudeData,
        });
        window.location.href = `${sistePabegynteSoknad.endreLenke}`;
    };

    if (!sistePabegynteSoknad) return null;

    return (
        <>
            <Heading size="medium" className={spacingStyles.blokkXs}>
                {tekst('heading')}
            </Heading>
            {props.children}
            <BodyShort className={spacingStyles.blokkXs}>{tekst('ingress')}</BodyShort>
            <BodyShort>{tekst('ikkeSendt')}</BodyShort>

            <Button
                onClick={handleClickFortsett}
                className={`${spacingStyles.mt1} ${spacingStyles.mb1}`}
                icon={<Next aria-hidden="true" />}
                iconPosition="right"
            >
                {tekst('fortsett')} {`${tekst('pabegynt')} ${prettyPrintDato(sistePabegynteSoknad.sistEndret, sprak)}`}{' '}
            </Button>

            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - påbegynt søknad"' />
        </>
    );
};

export default DagpengerHarPaabegyntSoknad;
