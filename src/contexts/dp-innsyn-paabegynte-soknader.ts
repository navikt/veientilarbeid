import { DP_INNSYN_URL } from '../ducks/api';
import { useSWRImmutable } from '../hooks/useSWR';

export interface DpInnsynPaabegyntSoknad {
    tittel: string;
    behandlingsId: string;
    sistEndret: string;
    erNySøknadsdialog?: boolean;
    endreLenke?: string;
}

export function useDpInnsynPaabegynteSoknaderData() {
    const { data, error } = useSWRImmutable<DpInnsynPaabegyntSoknad[]>(`${DP_INNSYN_URL}/paabegynte`);

    return {
        paabegynteSoknader: data,
        isLoading: !error && !data,
        isError: error,
    };
}
