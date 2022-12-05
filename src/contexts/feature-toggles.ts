import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    EGENVURDERING_UKE12 = 'veientilarbeid.egenvurderinguke12',
    VIS_GJELDER_FRA_DATO = 'veientilarbeid.vis-gjelder-fra-dato',
    BRUK_NY_BEHOVSVURDERING = 'veientilarbeid.bruk-ny-behovsvurdering',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.EGENVURDERING_UKE12:
            return 'Egenvurdering uke 12';
        case FeatureToggles.VIS_GJELDER_FRA_DATO:
            return 'Gjelder fra dato';
        case FeatureToggles.BRUK_NY_BEHOVSVURDERING:
            return 'Bruk ny behovsvurdering';
    }
}

export interface Data {
    'veientilarbeid.egenvurderinguke12': boolean;
    'veientilarbeid.vis-gjelder-fra-dato'?: boolean;
    'veientilarbeid.bruk-ny-behovsvurdering'?: boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.egenvurderinguke12': false,
        'veientilarbeid.vis-gjelder-fra-dato': false,
        'veientilarbeid.bruk-ny-behovsvurdering': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
