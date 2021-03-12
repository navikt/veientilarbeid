import samarbeidskontorer from '../lib/samarbeidskontorer.json';

interface Data {
    geografiskTilknytning: string;
    eksperiment: string;
}

function visEksperiment(data: Data) {
    const { geografiskTilknytning, eksperiment } = data;
    const kontor = samarbeidskontorer[geografiskTilknytning];
    return kontor?.eksperimeenter.includes(eksperiment);
}

export default visEksperiment;
