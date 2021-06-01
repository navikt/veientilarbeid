import { KontorEksperiment, Samarbeidskontorer } from './samarbeidskontorer';
import { EksperimentId } from './eksperimenter';
import { DinSituasjonSvar } from '../ducks/brukerregistrering';

export interface KontorBrukerContext {
    geografiskTilknytning?: string;
    registreringsDato?: Date | null;
    dinSituasjon?: DinSituasjonSvar;
}

function registrertEtterEksperimentdato(eksperiment: KontorEksperiment, registreringsdato?: Date | null) {
    if (!eksperiment.registrertEtterDato) return true;
    if (!registreringsdato) return false;
    return eksperiment.registrertEtterDato <= registreringsdato;
}

function harGyldigSituasjon(eksperiment: KontorEksperiment, dinSituasjon?: DinSituasjonSvar): boolean {
    if (!eksperiment.situasjoner) return true;
    if (!dinSituasjon) return false;
    return eksperiment.situasjoner.includes(dinSituasjon);
}

export function erSamarbeidskontor(geografiskTilknytning: string | null | undefined): boolean {
    if (!geografiskTilknytning) return false;
    return !!Samarbeidskontorer[geografiskTilknytning];
}

export function hentEksperimenterFraSamarbeidskontor(kontorBrukerContext: KontorBrukerContext): EksperimentId[] {
    const { geografiskTilknytning, registreringsDato, dinSituasjon } = kontorBrukerContext;
    if (!geografiskTilknytning) return [];

    const kontor = Samarbeidskontorer[geografiskTilknytning];
    if (!kontor?.eksperimenter) return [];

    return kontor.eksperimenter
        .filter((eksperiment) => registrertEtterEksperimentdato(eksperiment, registreringsDato))
        .filter((eksperiment) => harGyldigSituasjon(eksperiment, dinSituasjon))
        .map((eksperiment) => eksperiment.id);
}
