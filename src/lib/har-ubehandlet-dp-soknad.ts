interface Behandling {
    status: string;
    sistOppdatert: string;
}

type Resultat = 'ja' | 'nei';

function harUbehandletDpSoknad(behandlingskjeder: Behandling[]): Resultat {
    const underBehandling = behandlingskjeder.filter(
        (behandling: Behandling) => behandling.status === 'UNDER_BEHANDLING'
    );
    const ferdigBehandlet = behandlingskjeder.filter(
        (behandling: Behandling) => behandling.status === 'FERDIG_BEHANDLET'
    );
    return underBehandling.length > ferdigBehandlet.length ? 'ja' : 'nei';
}

export default harUbehandletDpSoknad;
