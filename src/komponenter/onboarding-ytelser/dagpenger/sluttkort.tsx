import HarIkkeSokt from './sluttkort-har-ikke-sokt';
import HarPabegyntSoknad from './sluttkort-har-paabegynt-soknad';
import HarSokt from './sluttkort-har-sokt';
import MottarDagpenger from './sluttkort-faar-dagpenger';
import Reaktivert from './sluttkort-har-blitt-reaktivert';
// import { useBrukerinfoData } from '../../../contexts/bruker-info';
// import { useBrukerregistreringData } from '../../../contexts/brukerregistrering';
// import { usePaabegynteSoknaderData } from '../../../contexts/paabegynte-soknader';
// import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
// import { useDpInnsynVedtakData } from '../../../contexts/dp-innsyn-vedtak';
// import { useMeldekortData } from '../../../contexts/meldekort';
// import beregnDagpengeStatus from '../../../lib/beregn-dagpenge-status';

function hentAktueltSluttkort(situasjon: string) {
    if (situasjon === 'pabegynt') {
        return HarPabegyntSoknad;
    } else if (situasjon === 'sokt') {
        return HarSokt;
    } else if (situasjon === 'mottar') {
        return MottarDagpenger;
    } else if (situasjon === 'reaktivert') {
        return Reaktivert;
    } else {
        return HarIkkeSokt;
    }
}

function Sluttkort() {
    // const brukerInfoData = useBrukerinfoData();
    // const registreringData = useBrukerregistreringData();
    // const paabegynteSoknader = usePaabegynteSoknaderData().soknader;
    // const innsendteSoknader = useDpInnsynSoknadData()?.soknad || [];
    // const dagpengeVedtak = useDpInnsynVedtakData().vedtak || [];
    // const meldekort = useMeldekortData()?.meldekort || [];

    // const dagpengeStatus = beregnDagpengeStatus({
    //     brukerInfoData,
    //     registreringData,
    //     paabegynteSoknader,
    //     innsendteSoknader,
    //     dagpengeVedtak,
    //     meldekort,
    // });

    const AktueltSluttkort = hentAktueltSluttkort('sokt'); // dagpengeStatus);
    return <AktueltSluttkort />;
}

export default Sluttkort;
