import { Eksperiment, Samarbeidskontorer } from '../lib/samarbeidskontorer';

interface Data {
    geografiskTilknytning: string;
    eksperiment: Eksperiment;
}

function visEksperiment(data: Data): boolean {
    const { geografiskTilknytning, eksperiment } = data;
    const kontor = Samarbeidskontorer[geografiskTilknytning];
    return kontor?.eksperimenter.includes(eksperiment) || false;
}

export default visEksperiment;
