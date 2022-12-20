import { Reaktivering } from '../contexts/reaktivering';

export type ReaktiveringEllerNull = Reaktivering | null;

function vilUtmeldes(reaktivering: ReaktiveringEllerNull): boolean {
    return (reaktivering && reaktivering.svar?.svar === 'nei') || false;
}

export { vilUtmeldes };
