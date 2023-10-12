import { KontorEksperiment, Samarbeidskontorer } from './samarbeidskontorer';
import { EksperimentId } from './eksperimenter';
import { DinSituasjonSvar } from '../hooks/use-brukerregistrering-data';

export interface KontorBrukerContext {
    geografiskTilknytning?: string;
    registreringsDato?: Date | null;
    dinSituasjon?: DinSituasjonSvar;
}

function registrertInnenEksperimentPeriode(eksperiment: KontorEksperiment, registreringsdato?: Date | null) {
    if (!eksperiment.startDato && !eksperiment.sluttDato) {
        return true;
    }
    if (!registreringsdato) return false;

    if (!eksperiment.startDato && eksperiment.sluttDato) {
        return eksperiment.sluttDato >= registreringsdato;
    }

    if (eksperiment.startDato && !eksperiment.sluttDato) {
        return eksperiment.startDato <= registreringsdato;
    }

    return eksperiment.startDato! <= registreringsdato && registreringsdato <= eksperiment.sluttDato!;
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
        .filter((eksperiment) => registrertInnenEksperimentPeriode(eksperiment, registreringsDato))
        .filter((eksperiment) => harGyldigSituasjon(eksperiment, dinSituasjon))
        .map((eksperiment) => eksperiment.id);
}
