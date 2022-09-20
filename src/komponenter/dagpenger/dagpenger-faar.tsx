import { Heading } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import PaabegynteSoknader from './paabegynte-soknader';
import { useDpInnsynVedtakData } from '../../contexts/dp-innsyn-vedtak';
import { sorterEtterNyesteVedtak } from '../../lib/beregn-dagpenge-status';
import SistInnsendtSoknad from './sist-innsendt-soknad';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import LesOmYtelser from './les-om-ytelser';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Du mottar dagpenger',
    },
    en: {
        heading: 'You receive unemployment benefits',
    },
};

const DagpengerFaar = () => {
    const dagpengeVedtak = useDpInnsynVedtakData();
    const sisteVedtak = dagpengeVedtak.sort(sorterEtterNyesteVedtak)[0];
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <>
            <Heading size="medium" className={spacingStyles.blokkXs}>
                {tekst('heading')}
            </Heading>
            <SistInnsendtSoknad dato={sisteVedtak?.datoFattet} komponent="mottar" />
            <PaabegynteSoknader dato={sisteVedtak?.datoFattet} komponent="mottar" />
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - mottar dagpenger"' />
            <LesOmYtelser amplitudeTemaNavn={'"dagpenger-tema - mottar dagpenger"'} />
        </>
    );
};

export default DagpengerFaar;
