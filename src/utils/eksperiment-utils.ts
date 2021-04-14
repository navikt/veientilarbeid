import { hentEllerSettFraLocalStorage } from './localStorage-utils';
import { EksperimentId } from '../lib/eksperimenter';
import { hentEksperimenterFraSamarbeidskontor } from './samarbeidskontor-utils';

export interface BrukerContext {
    geografiskTilknytning?: string;
    registreringsDato?: Date | null;
    enhetEksperimentId: number;
}

function lagNyEnhetEksperimentId() {
    return Math.floor(Math.random() * 99999).toString();
}

export function hentEnhetEksperimentId(): number {
    const id = hentEllerSettFraLocalStorage('enhetEksperimentId', lagNyEnhetEksperimentId());
    return parseInt(id, 10);
}

function hentEksperimenterForABTest(enhetEksperimentId: number): EksperimentId[] {
    const eksperimenter: EksperimentId[] = [];

    eksperimenter.push(enhetEksperimentId % 2 === 0 ? 'nesteknappIntro' : 'fullførknappIntro');

    return eksperimenter;
}

export function hentEksperimenter(brukerContext: BrukerContext): EksperimentId[] {
    return [
        ...hentEksperimenterForABTest(brukerContext.enhetEksperimentId),
        ...hentEksperimenterFraSamarbeidskontor(brukerContext),
    ];
}
