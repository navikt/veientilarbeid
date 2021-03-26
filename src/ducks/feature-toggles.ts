import * as React from 'react';
import { DataElement, STATUS } from './api';

export const alleFeatureToggles = [
    'veientilarbeid.feedback',
    'veientilarbeid.14a-intro',
    'veientilarbeid.meldekortintro.foralle',
];

export interface Data {
    'veientilarbeid.feedback': boolean;
    'veientilarbeid.14a-intro': boolean;
    'veientilarbeid.meldekortintro.foralle': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': false,
        'veientilarbeid.meldekortintro.foralle': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
