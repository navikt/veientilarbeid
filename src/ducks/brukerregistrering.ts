import { DataElement, STATUS } from './api';
import * as React from 'react';

export enum FremtidigSituasjonSvar {
    SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
    NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
    USIKKER = 'USIKKER',
    INGEN_PASSER = 'INGEN_PASSER',
}

export interface Besvarelse {
    dinSituasjon: string | null;
    fremtidigSituasjon: FremtidigSituasjonSvar;
    sisteStilling: string | null;
    tilbakeIArbeid: string | null;
    andreForhold: string | null;
    helseHinder: string | null;
    utdanning: string | null;
    utdanningBestatt: string | null;
    utdanningGodkjent: string | null;
}

export enum ForeslattInnsatsgruppe {
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    BEHOV_FOR_ARBEIDSEVNEVURDERING = 'BEHOV_FOR_ARBEIDSEVNEVURDERING',
}

export interface Profilering {
    innsatsgruppe: ForeslattInnsatsgruppe;
}

export interface Svar {
    sporsmalId: string;
    sporsmal: string;
    svar: string;
}

interface Brukerregistrering {
    opprettetDato: string;
    manueltRegistrertAv: object | null;
    besvarelse: Besvarelse;
    teksterForBesvarelse: Array<Svar> | null;
    profilering?: Profilering;
}

export interface Data {
    registrering: Brukerregistrering;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        registrering: {
            opprettetDato: Date.now().toString(),
            manueltRegistrertAv: null,
            besvarelse: {
                dinSituasjon: null,
                fremtidigSituasjon: FremtidigSituasjonSvar.USIKKER,
                sisteStilling: null,
                tilbakeIArbeid: null,
                andreForhold: null,
                helseHinder: null,
                utdanning: null,
                utdanningBestatt: null,
                utdanningGodkjent: null,
            },
            teksterForBesvarelse: [],
        },
    },
};

export const BrukerregistreringContext = React.createContext<State>(initialState);

export function selectFremtidigSituasjonSvar(data: Data): FremtidigSituasjonSvar | null {
    return data ? data.registrering.besvarelse.fremtidigSituasjon : null;
}

export function selectDinSituasjonSvar(data: Data): string | null {
    return data ? data.registrering.besvarelse.dinSituasjon : 'INGEN_VERDI';
}

export function selectForeslattInnsatsgruppe(data: Data): ForeslattInnsatsgruppe | undefined | null {
    const profilering = data ? data.registrering.profilering : null;

    return profilering ? profilering.innsatsgruppe : undefined;
}

export const selectOpprettetRegistreringDato = (data: Data): string | null => {
    return data ? data.registrering.opprettetDato : null;
};
