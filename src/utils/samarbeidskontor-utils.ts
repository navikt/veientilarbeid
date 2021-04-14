import { KontorEksperiment, Samarbeidskontorer } from '../lib/samarbeidskontorer';
import { EksperimentId } from '../lib/eksperimenter';
import { BrukerContext } from './eksperiment-utils';

function registrertEtterEksperimentdato(eksperiment: KontorEksperiment, registreringsdato?: Date | null) {
    if (!eksperiment.registrertEtterDato) return true;
    if (!registreringsdato) return false;
    return eksperiment.registrertEtterDato <= registreringsdato;
}

export function erSamarbeidskontor(geografiskTilknytning: string | null | undefined): boolean {
    if (!geografiskTilknytning) return false;
    return !!Samarbeidskontorer[geografiskTilknytning];
}

export function hentEksperimenterFraSamarbeidskontor(brukerContext: BrukerContext): EksperimentId[] {
    const { geografiskTilknytning, registreringsDato } = brukerContext;
    if (!geografiskTilknytning) return [];

    const kontor = Samarbeidskontorer[geografiskTilknytning];
    if (!kontor?.eksperimenter) return [];

    return kontor.eksperimenter
        .filter((eksperiment) => registrertEtterEksperimentdato(eksperiment, registreringsDato))
        .map((eksperiment) => eksperiment.id);
}
