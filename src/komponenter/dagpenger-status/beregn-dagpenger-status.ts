import { Soknad } from '../../ducks/paabegynte-soknader';

interface Behandling {
    status: string;
    sistOppdatert: string;
}

export interface Beregningsdata {
    rettighetsgruppe?: string;
    opprettetRegistreringDato?: Date | null;
    paabegynteSoknader?: Soknad[];
    behandlingskjeder?: Behandling[] | null;
}

export enum DagpengerSokestatuser {
    ukjentStatus = 'ukjentStatus',
    harPaabegynteSoknader = 'harPaabegynteSoknader',
    soknadUnderBehandling = 'soknadUnderBehandling',
    soknadFerdigBehandlet = 'soknadFerdigBehandlet',
    mottarDagpenger = 'mottarDagpenger',
}

type dagpengerSokestatus = DagpengerSokestatuser;

export function sistOppdatertSortering(a: Behandling, b: Behandling) {
    return new Date(b.sistOppdatert).getTime() - new Date(a.sistOppdatert).getTime();
}

function beregnDagpengerStatus(data: Beregningsdata): dagpengerSokestatus {
    const { behandlingskjeder, rettighetsgruppe, opprettetRegistreringDato, paabegynteSoknader } = data;
    let status = DagpengerSokestatuser.ukjentStatus;
    // Sjekker om det er påbegynte søknader etter registreringsdato
    if (opprettetRegistreringDato && paabegynteSoknader && paabegynteSoknader.length > 0) {
        const paabegynteSoknaderEtterRegistrering = paabegynteSoknader.filter(
            (soknad) => new Date(soknad.dato) > opprettetRegistreringDato
        );
        if (paabegynteSoknaderEtterRegistrering.length > 0) {
            status = DagpengerSokestatuser.harPaabegynteSoknader;
        }
    }
    // Sjekker om det er søknader under behandling eller ferdig behandlet etter registreringsdato
    if (opprettetRegistreringDato && behandlingskjeder) {
        const behandlingerEtterRegistrering = behandlingskjeder.filter(
            (behandling) => new Date(behandling.sistOppdatert) > opprettetRegistreringDato
        );
        if (behandlingerEtterRegistrering.length > 0) {
            behandlingerEtterRegistrering.sort(sistOppdatertSortering);
            const sisteBehandlingsStatus = behandlingerEtterRegistrering[0].status;
            status =
                sisteBehandlingsStatus === 'UNDER_BEHANDLING'
                    ? DagpengerSokestatuser.soknadUnderBehandling
                    : DagpengerSokestatuser.soknadFerdigBehandlet;
        }
    }
    if (rettighetsgruppe === 'DAGP') {
        status = DagpengerSokestatuser.mottarDagpenger;
    }
    return status;
}

export default beregnDagpengerStatus;
