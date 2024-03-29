import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    BRUK_BEKREFT_REAKTIVERING = 'aia.bruk-bekreft-reaktivering',
    BRUK_SPRAKVELGER = 'aia.bruk-sprakvelger',
    BRUK_TABS_DEMO = 'aia.bruk-tabs-demo',
    BRUK_ENDRING_AV_SITUASJON = 'aia.bruk-endring-av-situasjon',
    BRUK_MELDEKORT_MIKROFRONTEND = 'aia.bruk-meldekort-mikrofrontend',
    BRUK_REAKTIVERING_KNAPP = 'aia.bruk-reaktivering-knapp',
    BRUK_OPPRETT_OPPGAVE = 'aia.bruk-opprett-oppgave',
    BRUK_OPPLYSNINGER_API = 'aia.bruk-opplysninger-om-arbeidssoker-api',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.BRUK_BEKREFT_REAKTIVERING:
            return 'Bruk bekreft reaktivering';
        case FeatureToggles.BRUK_SPRAKVELGER:
            return 'Bruk språkvelger';
        case FeatureToggles.BRUK_TABS_DEMO:
            return 'Bruk tabs demo';
        case FeatureToggles.BRUK_ENDRING_AV_SITUASJON:
            return 'Bruk endring av situasjon';
        case FeatureToggles.BRUK_MELDEKORT_MIKROFRONTEND:
            return 'Bruk meldekort mikrofrontend';
        case FeatureToggles.BRUK_REAKTIVERING_KNAPP:
            return 'Bruk reaktivering knapp';
        case FeatureToggles.BRUK_OPPRETT_OPPGAVE:
            return 'Bruk opprett oppgave';
        case FeatureToggles.BRUK_OPPLYSNINGER_API:
            return 'Bruk opplysninger om arbeidssøker api';
    }
}

export interface FeatureToggleData {
    'aia.bruk-bekreft-reaktivering'?: boolean;
    'aia.bruk-sprakvelger'?: boolean;
    'aia.bruk-tabs-demo'?: boolean;
    'aia.bruk-endring-av-situasjon'?: boolean;
    'aia.bruk-meldekort-mikrofrontend'?: boolean;
    'aia.bruk-reaktivering-knapp'?: boolean;
    'aia.bruk-opprett-oppgave'?: boolean;
    'aia.bruk-opplysninger-om-arbeidssoker-api'?: boolean;
}

export interface State extends DataElement {
    data: FeatureToggleData;
}

export const initialState: State = {
    data: {
        'aia.bruk-bekreft-reaktivering': false,
        'aia.bruk-sprakvelger': false,
        'aia.bruk-tabs-demo': false,
        'aia.bruk-endring-av-situasjon': false,
        'aia.bruk-meldekort-mikrofrontend': false,
        'aia.bruk-reaktivering-knapp': false,
        'aia.bruk-opprett-oppgave': false,
        'aia.bruk-opplysninger-om-arbeidssoker-api': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
