import { DataElement, NESTE_MELDEKORT_URL } from '../ducks/api';
import { useSWR } from '../hooks/useSWR';

export interface State extends DataElement {
    data: Data | null;
}

interface MeldeperiodeInn {
    fra?: string;
    til?: string;
    kortKanSendesFra?: string;
    kanKortSendes?: boolean;
    periodeKode?: string;
}

export interface Meldekort {
    mottattDato?: string | null;
    meldeperiode?: MeldeperiodeInn | null;
    meldegruppe?: string | null;
}

export interface Data {
    meldekort?: Meldekort[];
}

export function useMeldekortData() {
    const { data, error } = useSWR<Data>(NESTE_MELDEKORT_URL);
    return {
        meldekortData: data,
        isLoading: !error && !data,
        isError: error,
    };
}
