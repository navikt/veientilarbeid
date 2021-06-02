import dagerFraDato from './dager-fra-dato';
import { Soknad } from '../ducks/paabegynte-soknader';

interface Data {
    soknader: Soknad[];
    registreringsDato: Date | null;
}

type Resultat = number | 'INGEN_DATA';

function datoSorteringSynkende(a: Date, b: Date) {
    return b.getTime() - a.getTime();
}

function dagerFraPabegyntSoknad(data: Data): Resultat {
    const { soknader, registreringsDato } = data;
    if (soknader.length === 0) return 'INGEN_DATA';
    if (!registreringsDato) return 'INGEN_DATA';
    const pabegynteSoknadsdatoer = soknader.map((soknad) => new Date(soknad.dato));
    pabegynteSoknadsdatoer.sort(datoSorteringSynkende);
    const sisteSoknadsDato = pabegynteSoknadsdatoer[0];

    return dagerFraDato(registreringsDato, sisteSoknadsDato);
}

export default dagerFraPabegyntSoknad;
