import { Eksperiment, Samarbeidskontorer } from '../lib/samarbeidskontorer';

interface Data {
    geografiskTilknytning?: string;
    eksperiment: Eksperiment;
}

export function visEksperiment(data: Data): boolean {
    const { geografiskTilknytning, eksperiment } = data;
    if (!geografiskTilknytning) return false;

    const kontor = Samarbeidskontorer[geografiskTilknytning];
    return kontor?.eksperimenter.includes(eksperiment) || false;
}

export function erSamarbeidskontor(geografiskTilknytning: string | null | undefined): boolean {
    if (!geografiskTilknytning) return false;
    return !!Samarbeidskontorer[geografiskTilknytning];
}
