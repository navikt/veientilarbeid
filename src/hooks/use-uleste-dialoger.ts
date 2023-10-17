import { useArbeidssokerData } from './use-arbeidssoker-data';
import { DataElement, STATUS } from '../ducks/api';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    antallUleste: number;
}

export const initialState: State = {
    data: {
        antallUleste: 0,
    },
    status: STATUS.NOT_STARTED,
};

export const useUlesteDialoger = () => useArbeidssokerData().data?.ulesteDialoger.data ?? initialState.data;
