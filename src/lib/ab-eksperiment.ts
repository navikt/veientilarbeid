import { EksperimentId } from '../lib/eksperimenter';
import { hentEllerSettFraLocalStorage } from '../utils/browserStorage-utils';

function lagNyEnhetEksperimentId() {
    return Math.floor(Math.random() * 99999).toString();
}

export function hentEnhetEksperimentId(): number {
    const id = hentEllerSettFraLocalStorage('enhetEksperimentId', lagNyEnhetEksperimentId());
    return parseInt(id, 10);
}

export function hentEksperimenterForABTest(enhetEksperimentId: number): EksperimentId[] {
    const eksperimenter: EksperimentId[] = [];

    eksperimenter.push(enhetEksperimentId % 2 === 0 ? 'nesteknappIntro' : 'fullførknappIntro');

    return eksperimenter;
}
