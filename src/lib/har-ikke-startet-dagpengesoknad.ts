import { DagpengeStatus } from './beregn-dagpenge-status';

const pabegyntEllerSoktStatuser: Array<DagpengeStatus> = [
    'sokt',
    'soktogpaabegynt',
    'paabegynt',
    'mottar',
    'innvilget',
    'avslag',
];

export const harIkkeStartetDagpengesoknad = (dagpengeStatus: DagpengeStatus): boolean => {
    return !pabegyntEllerSoktStatuser.includes(dagpengeStatus);
};

export default harIkkeStartetDagpengesoknad;
