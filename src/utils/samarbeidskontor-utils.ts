import { KontorEksperiment, Samarbeidskontorer } from '../lib/samarbeidskontorer';
import { EksperimentId } from '../lib/eksperimenter';

export interface KontorBrukerContext {
    geografiskTilknytning?: string;
    registreringsDato?: Date | null;
}

function registrertEtterEksperimentdato(eksperiment: KontorEksperiment, registreringsdato?: Date | null) {
    if (!eksperiment.registrertEtterDato) return true;
    if (!registreringsdato) return false;
    return eksperiment.registrertEtterDato <= registreringsdato;
}

export function erSamarbeidskontor(geografiskTilknytning: string | null | undefined): boolean {
    if (!geografiskTilknytning) return false;
    return !!Samarbeidskontorer[geografiskTilknytning];
}

export function hentEksperimenterFraSamarbeidskontor(kontorBrukerContext: KontorBrukerContext): EksperimentId[] {
    const { geografiskTilknytning, registreringsDato } = kontorBrukerContext;
    if (!geografiskTilknytning) return [];

    const kontor = Samarbeidskontorer[geografiskTilknytning];
    if (!kontor?.eksperimenter) return [];

    return kontor.eksperimenter
        .filter((eksperiment) => registrertEtterEksperimentdato(eksperiment, registreringsDato))
        .map((eksperiment) => eksperiment.id);
}
