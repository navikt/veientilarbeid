import { Heading } from '@navikt/ds-react';

import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
import { sorterEtterNyesteDatoInnsendt } from '../../../lib/beregn-dagpenge-status';
import SistInnsendtSoknad from './sist-innsendt-soknad';
import { useDpInnsynPaabegyntData } from '../../../contexts/dp-innsyn-paabegynte-soknader';
import PaabegynteSoknader from './paabegynte-soknader';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';
import LesOmYtelser from './les-om-ytelser';
import EttersendDokumentasjon from './ettersend-dokumentasjon';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

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

const Sluttkort = () => {
    const soknader = useDpInnsynSoknadData();
    const sisteInnsendteSoknad = soknader?.sort(sorterEtterNyesteDatoInnsendt)[0];
    const paabegynteSoknader = useDpInnsynPaabegyntData();
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
            <Heading size="medium" className={'blokk-xs'}>
                {harPaabegyntEtterInnsendt ? tekst('harPaabegynt') : tekst('soknad')}
            </Heading>
            <SistInnsendtSoknad dato={sisteInnsendteSoknad?.datoInnsendt} komponent="sokt" />
            <EttersendDokumentasjon amplitudeTemaNavn={amplitudeTemaNavn} />
            <PaabegynteSoknader dato={sisteInnsendteSoknad?.datoInnsendt} komponent="sokt" />
            <SkrivTilOssOgChat amplitudeTemaNavn={amplitudeTemaNavn} />
            <LesOmYtelser amplitudeTemaNavn={amplitudeTemaNavn} />
        </>
    );
};

export default Sluttkort;
