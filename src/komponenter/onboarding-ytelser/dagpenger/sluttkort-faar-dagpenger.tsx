import { Heading } from '@navikt/ds-react';
import PaabegynteSoknader from './paabegynte-soknader';
import { useDpInnsynVedtakData } from '../../../contexts/dp-innsyn-vedtak';
import { sorterEtterNyesteVedtak } from '../../../lib/beregn-dagpenge-status';
import SistInnsendtSoknad from './sist-innsendt-soknad';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';
import LesOmYtelser from './les-om-ytelser';
import SeMerInfo from './se-mer-info';

const Sluttkort = () => {
    const dagpengeVedtak = useDpInnsynVedtakData();
    const sisteVedtak = dagpengeVedtak.sort(sorterEtterNyesteVedtak)[0];

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du mottar dagpenger
            </Heading>

            <SeMerInfo amplitudeTemaNavn={'"dagpenger-tema - mottar dagpenger"'} />
            <SistInnsendtSoknad dato={sisteVedtak?.datoFattet} komponent="mottar" />
            <PaabegynteSoknader dato={sisteVedtak?.datoFattet} komponent="mottar" />
            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - mottar dagpenger"' />
            <LesOmYtelser amplitudeTemaNavn={'"dagpenger-tema - mottar dagpenger"'} />
        </>
    );
};

export default Sluttkort;
