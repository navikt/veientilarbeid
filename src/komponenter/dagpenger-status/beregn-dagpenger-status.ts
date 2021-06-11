import { Soknad } from '../../ducks/paabegynte-soknader';

export interface Beregningsdata {
    rettighetsgruppe?: string;
    opprettetRegistreringDato?: Date | null;
    paabegynteSoknader?: Soknad[];
}

function beregnDagpengerStatus(data: Beregningsdata): string {
    const { rettighetsgruppe, opprettetRegistreringDato, paabegynteSoknader } = data;
    let status = 'ukjentStatus';
    // Sjekker om det er påbegynte søknader etter registreringsdato
    if (opprettetRegistreringDato && paabegynteSoknader && paabegynteSoknader.length > 0) {
        const paabegynteSoknaderEtterRegistrering = paabegynteSoknader.filter(
            (soknad) => new Date(soknad.dato) > opprettetRegistreringDato
        );
        if (paabegynteSoknaderEtterRegistrering.length > 0) {
            status = 'harPaabegynteSoknader';
        }
    }
    if (rettighetsgruppe === 'DAGP') {
        status = 'mottarDagpenger';
    }
    return status;
}

export default beregnDagpengerStatus;
