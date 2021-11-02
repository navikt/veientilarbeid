import { Soknad } from '../../context/paabegynte-soknader';

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

function sistOppdatertSortering(a: Behandling, b: Behandling) {
    return new Date(b.sistOppdatert).getTime() - new Date(a.sistOppdatert).getTime();
}

export function sistOppdaterteBehandling(behandlingskjeder: Behandling[], registreringsdato: Date) {
    const behandlingerEtterRegistrering = behandlingskjeder.filter(
        (behandling) => new Date(behandling.sistOppdatert) > registreringsdato
    );
    if (behandlingerEtterRegistrering.length > 0) {
        behandlingerEtterRegistrering.sort(sistOppdatertSortering);
    }
    return behandlingerEtterRegistrering[0];
}

function beregnDagpengerStatus(data: Beregningsdata): dagpengerSokestatus {
    const { behandlingskjeder, rettighetsgruppe, opprettetRegistreringDato, paabegynteSoknader } = data;
    if (rettighetsgruppe === 'DAGP') {
        return DagpengerSokestatuser.mottarDagpenger;
    }
    if (!opprettetRegistreringDato) {
        return DagpengerSokestatuser.ukjentStatus;
    }

    // Sjekker om det er søknader under behandling eller ferdig behandlet etter registreringsdato
    if (behandlingskjeder) {
        const behandlingSistOppdatert = sistOppdaterteBehandling(behandlingskjeder, opprettetRegistreringDato);
        const sisteOppdaterteBehandlingEtterRegistreringsdato = behandlingSistOppdatert;

        if (sisteOppdaterteBehandlingEtterRegistreringsdato) {
            return sisteOppdaterteBehandlingEtterRegistreringsdato.status === 'UNDER_BEHANDLING'
                ? DagpengerSokestatuser.soknadUnderBehandling
                : DagpengerSokestatuser.soknadFerdigBehandlet;
        }
    }
    // Sjekker om det er påbegynte søknader etter registreringsdato
    if (paabegynteSoknader && paabegynteSoknader.length > 0) {
        const paabegynteSoknaderEtterRegistrering = paabegynteSoknader
            .filter((soknad) => new Date(soknad.dato) > opprettetRegistreringDato)
            .filter((soknad) => /[dD]agpenger/.test(soknad.tittel));
        if (paabegynteSoknaderEtterRegistrering.length > 0) {
            return DagpengerSokestatuser.harPaabegynteSoknader;
        }
    }
    return DagpengerSokestatuser.ukjentStatus;
}

export default beregnDagpengerStatus;
