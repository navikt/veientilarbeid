import dagerFraDato from './dager-fra-dato';

interface Behandling {
    status: string;
    sistOppdatert: string;
}

interface Data {
    behandlingskjeder: Behandling[];
    registreringsDato: Date | null;
}

type Resultat = number | 'INGEN_DATA';

function datoSorteringSynkende(a: Date, b: Date) {
    return b.getTime() - a.getTime();
}

function dagerFraInnsendtSoknad(data: Data): Resultat {
    const { behandlingskjeder, registreringsDato } = data;
    const innsendteSoknadsdatoer = behandlingskjeder
        .filter((behandling) => behandling.status === 'UNDER_BEHANDLING')
        .map((behandling) => new Date(behandling.sistOppdatert));
    if (innsendteSoknadsdatoer.length === 0) return 'INGEN_DATA';
    if (!registreringsDato) return 'INGEN_DATA';
    innsendteSoknadsdatoer.sort(datoSorteringSynkende);
    const sisteSoknadsDato = innsendteSoknadsdatoer[0];

    return dagerFraDato(registreringsDato, sisteSoknadsDato);
}

export default dagerFraInnsendtSoknad;
