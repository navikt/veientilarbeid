import { DataElement, NESTE_MELDEKORT_URL } from '../ducks/api';
import { useSWR } from './useSWR';
import { useAmplitudeData } from '../contexts/amplitude-context';
import { useEffect } from 'react';

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
    const { setMeldekortData } = useAmplitudeData();

    useEffect(() => {
        if (data) {
            setMeldekortData(data);
        }
    }, [data]);

    return {
        meldekortData: data,
        isLoading: !error && !data,
        isError: error,
    };
}
