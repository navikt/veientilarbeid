import HarIkkeSokt from './sluttkort-har-ikke-sokt';
import HarPabegyntSoknad from './sluttkort-har-paabegynt-soknad';
import HarSokt from './sluttkort-har-sokt';
import MottarDagpenger from './sluttkort-faar-dagpenger';

function hentAktueltSluttkort(situasjon: string) {
    if (situasjon === 'pabegynt') {
        return HarPabegyntSoknad;
    } else if (situasjon === 'sokt') {
        return HarSokt;
    } else if (situasjon === 'mottar') {
        return MottarDagpenger;
    } else {
        return HarIkkeSokt;
    }
}

function Sluttkort() {
    const AktueltSluttkort = hentAktueltSluttkort('');
    return <AktueltSluttkort />;
}

export default Sluttkort;
