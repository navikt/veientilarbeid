import { EksperimentId } from './eksperimenter';
import { hentEksperimenterFraSamarbeidskontor, KontorBrukerContext } from './samarbeidskontor-utils';
import { hentEksperimenterForABTest } from './ab-eksperiment';

export interface BrukerContext extends KontorBrukerContext {
    enhetEksperimentId: number;
}

export function hentEksperimenter(brukerContext: BrukerContext): EksperimentId[] {
    return [
        ...hentEksperimenterForABTest(brukerContext.enhetEksperimentId),
        ...hentEksperimenterFraSamarbeidskontor(brukerContext),
    ];
}
