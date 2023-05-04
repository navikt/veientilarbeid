import * as React from 'react';

import { DataElement, STATUS } from '../ducks/api';

export enum DinSituasjonSvar {
    MISTET_JOBBEN = 'MISTET_JOBBEN',
    ALDRI_HATT_JOBB = 'ALDRI_HATT_JOBB',
    HAR_SAGT_OPP = 'HAR_SAGT_OPP',
    VIL_BYTTE_JOBB = 'VIL_BYTTE_JOBB',
    ER_PERMITTERT = 'ER_PERMITTERT',
    USIKKER_JOBBSITUASJON = 'USIKKER_JOBBSITUASJON',
    JOBB_OVER_2_AAR = 'JOBB_OVER_2_AAR',
    VIL_FORTSETTE_I_JOBB = 'VIL_FORTSETTE_I_JOBB',
    AKKURAT_FULLFORT_UTDANNING = 'AKKURAT_FULLFORT_UTDANNING',
    DELTIDSJOBB_VIL_MER = 'DELTIDSJOBB_VIL_MER',
    INGEN_SVAR = 'INGEN_SVAR',
    INGEN_VERDI = 'INGEN_VERDI',
}

export enum FremtidigSituasjonSvar {
    SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
    NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
    USIKKER = 'USIKKER',
    INGEN_PASSER = 'INGEN_PASSER',
}

export enum UtdanningSvar {
    INGEN_UTDANNING = 'INGEN_UTDANNING',
    GRUNNSKOLE = 'GRUNNSKOLE',
    VIDEREGAENDE_GRUNNUTDANNING = 'VIDEREGAENDE_GRUNNUTDANNING',
    VIDEREGAENDE_FAGBREV_SVENNEBREV = 'VIDEREGAENDE_FAGBREV_SVENNEBREV',
    HOYERE_UTDANNING_1_TIL_4 = 'HOYERE_UTDANNING_1_TIL_4',
    HOYERE_UTDANNING_5_ELLER_MER = 'HOYERE_UTDANNING_5_ELLER_MER',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum UtdanningBestattSvar {
    JA = 'JA',
    NEI = 'NEI',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum UtdanningGodkjentSvar {
    JA = 'JA',
    NEI = 'NEI',
    VET_IKKE = 'VET_IKKE',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum HelseHinderSvar {
    JA = 'JA',
    NEI = 'NEI',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum AndreForholdSvar {
    JA = 'JA',
    NEI = 'NEI',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum SisteStillingSvar {
    HAR_HATT_JOBB = 'HAR_HATT_JOBB',
    HAR_IKKE_HATT_JOBB = 'HAR_IKKE_HATT_JOBB',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum TilbakeIArbeidSvar {
    JA_FULL_STILLING = 'JA_FULL_STILLING',
    JA_REDUSERT_STILLING = 'JA_REDUSERT_STILLING',
    USIKKER = 'USIKKER',
    NEI = 'NEI',
}

export interface Besvarelse {
    dinSituasjon: DinSituasjonSvar | null;
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

export interface SisteStilling {
    konseptId: number;
    label: string;
    styrk08: string;
}

export interface Brukerregistrering {
    opprettetDato: string;
    manueltRegistrertAv: object | null;
    besvarelse: Besvarelse;
    teksterForBesvarelse: Array<Svar> | null;
    profilering?: Profilering;
    sisteStilling?: SisteStilling | undefined | null;
}

export interface Data {
    registrering: Brukerregistrering;
}

export interface State extends DataElement {
    data: Data | null;
}

export const initialState: State = {
    status: STATUS.NOT_STARTED,
    data: {
        registrering: {
            opprettetDato: new Date().toISOString(),
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
            sisteStilling: null,
        },
    },
};

export const BrukerregistreringContext = React.createContext<State>(initialState);

export const useBrukerregistreringData = () => React.useContext(BrukerregistreringContext).data;

export function selectFremtidigSituasjonSvar(data: Data | null): FremtidigSituasjonSvar | null {
    return data && data.registrering ? data.registrering?.besvarelse.fremtidigSituasjon : null;
}

export function selectDinSituasjonSvar(data: Data | null): DinSituasjonSvar {
    return data?.registrering?.besvarelse?.dinSituasjon || DinSituasjonSvar.INGEN_VERDI;
}

export function selectForeslattInnsatsgruppe(data: Data | null): ForeslattInnsatsgruppe | undefined | null {
    const profilering = data && data.registrering ? data.registrering?.profilering : null;

    return profilering ? profilering.innsatsgruppe : undefined;
}

export const selectOpprettetRegistreringDato = (data: Data | null): string | null => {
    return data && data.registrering ? data.registrering?.opprettetDato : null;
};
