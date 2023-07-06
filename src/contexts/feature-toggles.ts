import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    VIS_GJELDER_FRA_DATO = 'veientilarbeid.vis-gjelder-fra-dato',
    BRUK_BEKREFT_REAKTIVERING = 'aia.bruk-bekreft-reaktivering',
    BRUK_SPRAKVELGER = 'aia.bruk-sprakvelger',
    BRUK_TABS_DEMO = 'aia.bruk-tabs-demo',
    BRUK_ENDRING_AV_SITUASJON = 'aia.bruk-endring-av-situasjon',
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
    }
}

export interface FeautreToggleData {
    'veientilarbeid.vis-gjelder-fra-dato'?: boolean;
    'aia.bruk-bekreft-reaktivering'?: boolean;
    'aia.bruk-sprakvelger'?: boolean;
    'aia.bruk-tabs-demo'?: boolean;
    'aia.bruk-endring-av-situasjon'?: boolean;
}

export interface State extends DataElement {
    data: FeautreToggleData;
}

export const initialState: State = {
    data: {
        'veientilarbeid.vis-gjelder-fra-dato': false,
        'aia.bruk-bekreft-reaktivering': false,
        'aia.bruk-sprakvelger': false,
        'aia.bruk-tabs-demo': false,
        'aia.bruk-endring-av-situasjon': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
