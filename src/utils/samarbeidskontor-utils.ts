import { Eksperiment, EksperimentId, Samarbeidskontorer } from '../lib/samarbeidskontorer';

interface BrukerContext {
    geografiskTilknytning?: string;
    registreringsDato?: Date | null;
}

function registrertEtterEksperimentdato(eksperiment: Eksperiment, registreringsdato?: Date | null) {
    if (!eksperiment.registrertEtterDato) return true;
    if (!registreringsdato) return false;
    return eksperiment.registrertEtterDato <= registreringsdato;
}

export function visEksperiment(eksperimentId: EksperimentId, context: BrukerContext): boolean {
    const { geografiskTilknytning, registreringsDato } = context;
    if (!geografiskTilknytning) return false;

    const kontor = Samarbeidskontorer[geografiskTilknytning];
    if (!kontor?.eksperimenter) return false;

    return (
        kontor.eksperimenter
            .filter((kontorEksperiment) => kontorEksperiment.id === eksperimentId)
            .filter((eksperiment) => registrertEtterEksperimentdato(eksperiment, registreringsDato)).length > 0
    );
}

export function erSamarbeidskontor(geografiskTilknytning: string | null | undefined): boolean {
    if (!geografiskTilknytning) return false;
    return !!Samarbeidskontorer[geografiskTilknytning];
}

export function hentEksperimenter(brukerContext: BrukerContext): EksperimentId[] {
    const { geografiskTilknytning, registreringsDato } = brukerContext;
    if (!geografiskTilknytning) return [];

    const kontor = Samarbeidskontorer[geografiskTilknytning];
    if (!kontor?.eksperimenter) return [];

    return kontor.eksperimenter
        .filter((eksperiment) => registrertEtterEksperimentdato(eksperiment, registreringsDato))
        .map((eksperiment) => eksperiment.id);
}
