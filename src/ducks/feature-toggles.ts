import * as React from 'react';
import { DataElement, STATUS } from './api';

export const alleFeatureToggles = [
    'veientilarbeid.motestotte.lansert',
    'veientilarbeid.meldekort.ny-tekst'
];

export interface Data {
    'veientilarbeid.motestotte.lansert': boolean;
    'veientilarbeid.meldekort.ny-tekst': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.motestotte.lansert': false,
        'veientilarbeid.meldekort.ny-tekst': false
    },
    status: STATUS.NOT_STARTED
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
