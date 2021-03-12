import eksperimenter from '../lib/eksperimenter.json';

interface Data {
    geografiskTilknytning: string;
    eksperiment: string;
}

function visEksperiment(data: Data) {
    const { geografiskTilknytning, eksperiment } = data;
    const kontor = eksperimenter[geografiskTilknytning];
    return kontor?.eksperimenter.includes(eksperiment);
}

export default visEksperiment;
