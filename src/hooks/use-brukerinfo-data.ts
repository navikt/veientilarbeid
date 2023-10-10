import { useArbeidssokerData } from './use-arbeidssoker-data';
import { DataElement, STATUS } from '../ducks/api';

export enum RegistreringType {
    REAKTIVERING = 'REAKTIVERING',
    SPERRET = 'SPERRET',
    ALLEREDE_REGISTRERT = 'ALLEREDE_REGISTRERT',
    SYKMELDT_REGISTRERING = 'SYKMELDT_REGISTRERING',
    ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING',
}

export type RegistreringTypeOrIngenVerdi = RegistreringType | 'INGEN_VERDI';

export interface State extends DataElement {
    data: Data;
}

export interface Data {
    erSykmeldtMedArbeidsgiver: boolean;
    registreringType?: RegistreringTypeOrIngenVerdi;
    geografiskTilknytning?: string;
    rettighetsgruppe: string;
    alder: number;
}

export const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        erSykmeldtMedArbeidsgiver: false,
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: '',
        rettighetsgruppe: 'INGEN_VERDI',
        alder: 0,
    },
};

export const useBrukerInfoData = () => {
    console.log('data: ', useArbeidssokerData().data);
    console.log('isLoading: ', useArbeidssokerData().isLoading);
    console.log('error: ', useArbeidssokerData().error);
    return useArbeidssokerData().data?.brukerInfo.data ?? initialState.data;
};
