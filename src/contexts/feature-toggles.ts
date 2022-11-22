import * as React from 'react';
import { DataElement, STATUS } from '../ducks/api';

export enum FeatureToggles {
    EGENVURDERING_UKE12 = 'veientilarbeid.egenvurderinguke12',
    VIS_GJELDER_FRA_DATO = 'veientilarbeid.vis-gjelder-fra-dato',
    BRUK_NY_BEHOVSVURDERING = 'veientilarbeid.bruk-ny-behovsvurdering',
    BRUK_MELDEPLIKT_HENDELSER = 'veientilarbeid.bruk-meldeplikt-hendelser',
    BRUK_DAGPENGER_STATUS = 'veientilarbeid.bruk-dagpenger-status',
}

export function prettyPrintFeatureToggle(toggle: FeatureToggles) {
    switch (toggle) {
        case FeatureToggles.EGENVURDERING_UKE12:
            return 'Egenvurdering uke 12';
        case FeatureToggles.VIS_GJELDER_FRA_DATO:
            return 'Gjelder fra dato';
        case FeatureToggles.BRUK_NY_BEHOVSVURDERING:
            return 'Bruk ny behovsvurdering';
        case FeatureToggles.BRUK_MELDEPLIKT_HENDELSER:
            return 'Bruk meldeplikt hendelser';
        case FeatureToggles.BRUK_DAGPENGER_STATUS:
            return 'Bruk dagpenger-status';
    }
}

export interface Data {
    'veientilarbeid.egenvurderinguke12': boolean;
    'veientilarbeid.vis-gjelder-fra-dato'?: boolean;
    'veientilarbeid.bruk-ny-behovsvurdering'?: boolean;
    'veientilarbeid.bruk-meldeplikt-hendelser'?: boolean;
    'veientilarbeid.bruk-dagpenger-status'?: boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.egenvurderinguke12': false,
        'veientilarbeid.vis-gjelder-fra-dato': false,
        'veientilarbeid.bruk-ny-behovsvurdering': false,
        'veientilarbeid.bruk-meldeplikt-hendelser': false,
        'veientilarbeid.bruk-dagpenger-status': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);

export const useFeatureToggleData = () => React.useContext(FeaturetoggleContext).data;
