import { Heading } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { DpInnsynSoknad } from '../../contexts/dp-innsyn-soknad';
import { useDpInnsynPaabegynteSoknaderData } from '../../contexts/dp-innsyn-paabegynte-soknader';
import { useSprakValg } from '../../contexts/sprak';

import { sorterEtterNyesteDatoInnsendt } from '../../lib/beregn-dagpenge-status';
import SistInnsendtSoknad from './sist-innsendt-soknad';
import PaabegynteSoknader from './paabegynte-soknader';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import LesOmYtelser from './les-om-ytelser';
import EttersendDokumentasjon from './ettersend-dokumentasjon';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSWRImmutable } from '../../hooks/useSWR';
import { DP_INNSYN_URL } from '../../ducks/api';

const TEKSTER: Tekster<string> = {
    nb: {
        harPaabegynt: 'Søknad om dagpenger og påbegynte søknader',
        soknad: 'Søknad om dagpenger',
    },
    en: {
        harPaabegynt: 'Application for unemployment benefits and started applications',
        soknad: 'Application for unemployment benefits',
    },
};

const DagpengerHarSokt = () => {
    const { data: soknader = [] } = useSWRImmutable<DpInnsynSoknad[]>(`${DP_INNSYN_URL}/soknad`);
    const sisteInnsendteSoknad = soknader?.sort(sorterEtterNyesteDatoInnsendt)[0];
    const { paabegynteSoknader = [] } = useDpInnsynPaabegynteSoknaderData();
    const sistePaabegyntSoknad = paabegynteSoknader.sort(
        (a, b) => new Date(b.sistEndret).getTime() - new Date(a.sistEndret).getTime()
    )[0];
    const harPaabegyntEtterInnsendt =
        sistePaabegyntSoknad &&
        new Date(sistePaabegyntSoknad.sistEndret).getTime() > new Date(sisteInnsendteSoknad?.datoInnsendt).getTime();

    const amplitudeTemaNavn = '"dagpenger-tema - har søkt dagpenger"';
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <Heading size="medium" className={spacingStyles.blokkXs}>
                {harPaabegyntEtterInnsendt ? tekst('harPaabegynt') : tekst('soknad')}
            </Heading>
            <SistInnsendtSoknad dato={sisteInnsendteSoknad?.datoInnsendt} komponent="sokt" />
            <EttersendDokumentasjon amplitudeTemaNavn={amplitudeTemaNavn} />
            <PaabegynteSoknader dato={sisteInnsendteSoknad?.datoInnsendt} komponent="sokt" />
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn={amplitudeTemaNavn} />
            <LesOmYtelser amplitudeTemaNavn={amplitudeTemaNavn} />
        </>
    );
};

export default DagpengerHarSokt;
