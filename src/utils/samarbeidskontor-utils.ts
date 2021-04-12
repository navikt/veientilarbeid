import { Eksperiment, Samarbeidskontorer } from '../lib/samarbeidskontorer';

interface BrukerContext {
    geografiskTilknytning?: string;
}

export function visEksperiment(eksperiment: Eksperiment, context: BrukerContext): boolean {
    const { geografiskTilknytning } = context;
    if (!geografiskTilknytning) return false;

    const kontor = Samarbeidskontorer[geografiskTilknytning];
    return kontor?.eksperimenter.includes(eksperiment) || false;
}

export function erSamarbeidskontor(geografiskTilknytning: string | null | undefined): boolean {
    if (!geografiskTilknytning) return false;
    return !!Samarbeidskontorer[geografiskTilknytning];
}

export function hentEksperimenter({ geografiskTilknytning }: { geografiskTilknytning?: string }): Eksperiment[] {
    if (!geografiskTilknytning) return [];
    return Samarbeidskontorer[geografiskTilknytning]?.eksperimenter ?? [];
}
