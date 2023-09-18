import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    VIS_GJELDER_FRA_DATO = 'veientilarbeid.vis-gjelder-fra-dato',
    BRUK_BEKREFT_REAKTIVERING = 'aia.bruk-bekreft-reaktivering',
    BRUK_SPRAKVELGER = 'aia.bruk-sprakvelger',
    BRUK_TABS_DEMO = 'aia.bruk-tabs-demo',
    BRUK_ENDRING_AV_SITUASJON = 'aia.bruk-endring-av-situasjon',
    BRUK_MELDEKORT_MIKROFRONTEND = 'aia.bruk-meldekort-mikrofrontend',
    BRUK_REAKTIVERING_KNAPP = 'aia.bruk-reaktivering-knapp',
    BRUK_OPPRETT_OPPGAVE = 'aia.bruk-opprett-oppgave',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.VIS_GJELDER_FRA_DATO:
            return 'Gjelder fra dato';
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
    }
}

export interface FeatureToggleData {
    'veientilarbeid.vis-gjelder-fra-dato'?: boolean;
    'aia.bruk-bekreft-reaktivering'?: boolean;
    'aia.bruk-sprakvelger'?: boolean;
    'aia.bruk-tabs-demo'?: boolean;
    'aia.bruk-endring-av-situasjon'?: boolean;
    'aia.bruk-meldekort-mikrofrontend'?: boolean;
    'aia.bruk-reaktivering-knapp'?: boolean;
    'aia.bruk-opprett-oppgave'?: boolean;
}

export interface State extends DataElement {
    data: FeatureToggleData;
}

export const initialState: State = {
    data: {
        'veientilarbeid.vis-gjelder-fra-dato': false,
        'aia.bruk-bekreft-reaktivering': false,
        'aia.bruk-sprakvelger': false,
        'aia.bruk-tabs-demo': false,
        'aia.bruk-endring-av-situasjon': false,
        'aia.bruk-meldekort-mikrofrontend': false,
        'aia.bruk-reaktivering-knapp': false,
        'aia.bruk-opprett-oppgave': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
