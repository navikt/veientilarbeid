interface Behandling {
    status: string;
    sistOppdatert: string;
}

type Resultat = 'ja' | 'nei';

function harUbehandletDpSoknad(behandlingskjeder: Behandling[]): Resultat {
    if (behandlingskjeder.length === 0) return 'nei';

    const nyesteSoknad = behandlingskjeder.sort((behandling) => {
        return new Date(behandling.sistOppdatert).getMilliseconds();
    })[0];

    return nyesteSoknad.status !== 'FERDIG_BEHANDLET' ? 'ja' : 'nei';
}

export default harUbehandletDpSoknad;
