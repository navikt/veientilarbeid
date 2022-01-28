import { Heading } from '@navikt/ds-react';
import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
import { sorterEtterNyesteDatoInnsendt } from '../../../lib/beregn-dagpenge-status';
import SistInnsendtSoknad from './sist-innsendt-soknad';
import { usePaabegynteSoknaderData } from '../../../contexts/paabegynte-soknader';
import PaabegynteSoknader from './paabegynte-soknader';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';
import LesOmYtelser from './les-om-ytelser';
import EttersendDokumentasjon from './ettersend-dokumentasjon';

const Sluttkort = () => {
    const soknader = useDpInnsynSoknadData();
    const sisteInnsendteSoknad = soknader?.sort(sorterEtterNyesteDatoInnsendt)[0];
    const paabegynteSoknader = usePaabegynteSoknaderData().soknader;
    const sistePaabegyntSoknad = paabegynteSoknader.sort(
        (a, b) => new Date(b.dato).getTime() - new Date(a.dato).getTime()
    )[0];
    const harPaabegyntEtterInnsendt =
        sistePaabegyntSoknad &&
        new Date(sistePaabegyntSoknad.dato).getTime() > new Date(sisteInnsendteSoknad?.datoInnsendt).getTime();

    const amplitudeTemaNavn = '"dagpenger-tema - har søkt dagpenger"';

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                {harPaabegyntEtterInnsendt ? 'Søknad om dagpenger og påbegynte søknader' : 'Søknad om dagpenger'}
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
