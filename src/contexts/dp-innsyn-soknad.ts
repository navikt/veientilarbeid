import { DataElement, STATUS } from '../ducks/api';
import { createContext, useContext } from 'react';

export interface State extends DataElement {
    data: Data | null;
}

export interface DpInnsynSoknad {
    søknadId: string;
    skjemaKode: String;
    tittel: string;
    journalpostId: string;
    søknadsType: string;
    kanal: string;
    datoInnsendt: string;
    vedlegg: [
        {
            skjemaNummer: string;
            navn: string;
            status: string; // INNVILGET | AVSLÅTT | STANS | ENDRING
        }
    ];
}

export interface Data {
    soknad: DpInnsynSoknad[];
}

export const initialState: State = {
    data: { soknad: [] },
    status: STATUS.NOT_STARTED,
};

export const DpInnsynSoknadContext = createContext<State>(initialState);

export const useDpInnsynSoknadData = () => useContext(DpInnsynSoknadContext).data;
