import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    EGENVURDERING_UKE12 = 'veientilarbeid.egenvurderinguke12',
    VIS_GJELDER_FRA_DATO = 'veientilarbeid.vis-gjelder-fra-dato',
    BRUK_KLARER_SEG_SELV = 'veientilarbeid.bruk-klarer-seg-selv',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.EGENVURDERING_UKE12:
            return 'Egenvurdering uke 12';
        case FeatureToggles.VIS_GJELDER_FRA_DATO:
            return 'Gjelder fra dato';
        case FeatureToggles.BRUK_KLARER_SEG_SELV:
            return 'Bruk klarer seg selv';
    }
}

export interface Data {
    'veientilarbeid.egenvurderinguke12': boolean;
    'veientilarbeid.vis-gjelder-fra-dato'?: boolean;
    'veientilarbeid.bruk-klarer-seg-selv'?: boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.egenvurderinguke12': false,
        'veientilarbeid.vis-gjelder-fra-dato': false,
        'veientilarbeid.bruk-klarer-seg-selv': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
