import { KontorEksperiment, Samarbeidskontorer } from '../lib/samarbeidskontorer';
import { hentEllerSettFraLocalStorage } from './localStorage-utils';
import { EksperimentId } from '../lib/eksperimenter';

interface BrukerContext {
    geografiskTilknytning?: string;
    registreringsDato?: Date | null;
    enhetEksperimentId: number;
}

function registrertEtterEksperimentdato(eksperiment: KontorEksperiment, registreringsdato?: Date | null) {
    if (!eksperiment.registrertEtterDato) return true;
    if (!registreringsdato) return false;
    return eksperiment.registrertEtterDato <= registreringsdato;
}

export function erSamarbeidskontor(geografiskTilknytning: string | null | undefined): boolean {
    if (!geografiskTilknytning) return false;
    return !!Samarbeidskontorer[geografiskTilknytning];
}

export function hentEnhetEksperimentId(): number {
    const id = hentEllerSettFraLocalStorage('enhetEksperimentId', Math.floor(Math.random() * 99999).toString());
    return parseInt(id, 10);
}

function hentEksperimenterForABTest(enhetEksperimentId: number): EksperimentId[] {
    const eksperimenter: EksperimentId[] = [];

    eksperimenter.push(enhetEksperimentId % 2 === 0 ? 'nesteknappIntro' : 'fullførknappIntro');

    return eksperimenter;
}

function hentEksperimenterFraSamarbeidskontor(brukerContext: BrukerContext): EksperimentId[] {
    const { geografiskTilknytning, registreringsDato } = brukerContext;
    if (!geografiskTilknytning) return [];

    const kontor = Samarbeidskontorer[geografiskTilknytning];
    if (!kontor?.eksperimenter) return [];

    return kontor.eksperimenter
        .filter((eksperiment) => registrertEtterEksperimentdato(eksperiment, registreringsDato))
        .map((eksperiment) => eksperiment.id);
}

export function hentEksperimenter(brukerContext: BrukerContext): EksperimentId[] {
    return [
        ...hentEksperimenterForABTest(brukerContext.enhetEksperimentId),
        ...hentEksperimenterFraSamarbeidskontor(brukerContext),
    ];
}

export function visEksperiment(eksperimentId: EksperimentId, context: BrukerContext): boolean {
    return hentEksperimenter(context).includes(eksperimentId);
}
