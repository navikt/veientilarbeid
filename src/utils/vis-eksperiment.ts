import samarbeidskontorer from '../lib/samarbeidskontorer.json';

interface Data {
    geografiskTilknytning: string;
    eksperiment: string;
}

function visEksperiment(data: Data): boolean {
    const { geografiskTilknytning, eksperiment } = data;
    const kontor = samarbeidskontorer[geografiskTilknytning];
    return kontor?.eksperimenter.includes(eksperiment) || false;
}

export default visEksperiment;
