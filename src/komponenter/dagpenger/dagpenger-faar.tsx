import { Heading } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import PaabegynteSoknader from './paabegynte-soknader';
import { sorterEtterNyesteVedtak } from '../../lib/beregn-dagpenge-status';
import SistInnsendtSoknad from './sist-innsendt-soknad';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import LesOmYtelser from './les-om-ytelser';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useSWRImmutable } from '../../hooks/useSWR';
import { DP_INNSYN_URL } from '../../ducks/api';
import { Vedtak } from '../../models/dagpenger';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Du mottar dagpenger',
    },
    en: {
        heading: 'You receive unemployment benefits',
    },
};

const DagpengerFaar = (props: any) => {
    const { data: dagpengeVedtak = [] } = useSWRImmutable<Vedtak[]>(`${DP_INNSYN_URL}/vedtak`);
    const sisteVedtak = dagpengeVedtak.sort(sorterEtterNyesteVedtak)[0];
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <>
            <Heading size="small" className={spacingStyles.blokkXs}>
                {tekst('heading')}
            </Heading>
            {props.children}
            <SistInnsendtSoknad dato={sisteVedtak?.datoFattet} komponent="mottar" />
            <PaabegynteSoknader dato={sisteVedtak?.datoFattet} komponent="mottar" />
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - mottar dagpenger"' />
            <LesOmYtelser amplitudeTemaNavn={'"dagpenger-tema - mottar dagpenger"'} />
        </>
    );
};

export default DagpengerFaar;
