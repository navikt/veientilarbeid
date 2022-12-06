import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    VIS_GJELDER_FRA_DATO = 'veientilarbeid.vis-gjelder-fra-dato',
    BRUK_BEKREFT_REAKTIVERING = 'veientilarbeid.bruk-bekreft-reaktivering',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.VIS_GJELDER_FRA_DATO:
            return 'Gjelder fra dato';
        case FeatureToggles.BRUK_BEKREFT_REAKTIVERING:
            return 'Bruk bekreft reaktivering';
    }
}

export interface Data {
    'veientilarbeid.vis-gjelder-fra-dato'?: boolean;
    'veientilarbeid.bruk-bekreft-reaktivering'?: boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.vis-gjelder-fra-dato': false,
        'veientilarbeid.bruk-bekreft-reaktivering': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
